import { Alert, Button, Form, Input, Loading, Modal, Progress } from '@/Components/utility'
import useAuth from '@/Contexts/useAuth'
import useGlobals from '@/Contexts/useGlobals'
import { db } from '@/Firebase/index'
import useValidation from '@/Hooks/useValidation'
import dayjs from 'dayjs'
import { doc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { FiInfo, FiLoader } from 'react-icons/fi'
import { BudgetVisualizer } from '@/Components/pages/budgets'

const CurrentMonthBudget = ({
    transactions,
    dataLoading
}) => {
    const { user } = useAuth()

    const currentMonth = dayjs().format('MM-YYYY')
    const [currentMonthTransactions, setCurrentMonthTransactions] = useState([])

    const [loading, setLoading] = useState(true)

    const [budget, setBudget] = useState(null)
    const [spent, setSpent] = useState(0)
    const [remaining, setRemaining] = useState(0)
    const [percentageRemaining, setPercentageRemaining] = useState(0)

    const [addBudgetModalOpen, setAddBudgetModalOpen] = useState(false)

    useEffect(() => {
        setLoading(true)
        onSnapshot(doc(db, 'users', user.uid, 'budgets', currentMonth), (doc) => {
            if (doc.exists()) {
                setBudget({
                    id: doc.id,
                    ...doc.data()
                })
            }
            else {
                setBudget(null)
            }
        })
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [user.uid, currentMonth])

    useEffect(() => {
        setCurrentMonthTransactions(transactions.filter((transaction) => {
            return dayjs(transaction.transactionDate.toDate()).format('MM-YYYY') === currentMonth
        }))
    }, [transactions, currentMonth])

    useEffect(() => {
        setSpent(currentMonthTransactions.reduce((acc, transaction) => {
            if (transaction.transactionType === 'Expense') {
                return acc + transaction.transactionAmount
            }
            return acc
        }, 0))
    }, [currentMonthTransactions])

    useEffect(() => {
        if (budget) {
            setRemaining(budget.amount - spent)
            setPercentageRemaining(((budget.amount - spent) / budget.amount) * 100)
        }
    }, [budget, spent])


    return (
        <div className={[
            'w-full rounded flex flex-col'
        ].join(' ')}>
            <div className="flex justify-between">
                <span className='font-medium text-sm'>
                    My Budget
                </span>
            </div>
            {
                loading ? (
                    <Loading inline />
                ) : (

                    budget ? (
                        <div className='w-full flex flex-col gap-1'>
                            {
                                percentageRemaining > 0 ? (
                                    <div className='text-3xl pt-2'>
                                        I can spend <span className={[
                                            'font-semibold',
                                            (percentageRemaining >= 0 && percentageRemaining <= 20) && 'text-error-600',
                                            (percentageRemaining > 20 && percentageRemaining <= 50) && 'text-warn-500',
                                            (percentageRemaining > 50 && percentageRemaining <= 80) && 'text-info-500',
                                            (percentageRemaining > 80 && percentageRemaining <= 100) && 'text-success-600',
                                        ].join(' ')}>
                                            ₹{remaining}
                                        </span> this month!
                                    </div>
                                ) : (
                                    <div className='text-3xl py-2'>
                                        Shit! I went over budget by <span className='font-semibold text-error-600'> ₹{remaining.toString().replace('-', '')}</span> this month!
                                    </div>
                                )
                            }

                            {/* <Progress
                                color={
                                    (percentageRemaining >= 0 && percentageRemaining <= 20) ? 'error' :
                                        (percentageRemaining > 20 && percentageRemaining <= 50) ? 'warn' :
                                            (percentageRemaining > 50 && percentageRemaining <= 80) ? 'info' :
                                                (percentageRemaining > 80 && percentageRemaining <= 100) ? 'success' : 'error'
                                }
                                max={budget.amount}
                                min={0}
                                value={spent}
                                wFull={true}
                                showPercentage={false}
                            /> */}
                            <BudgetVisualizer budget={budget.amount} spent={spent} percentageRemaining={percentageRemaining} />
                        </div>
                    ) : (
                        <div className='w-full flex flex-col gap-1 py-2'>
                            <div className={[
                                'p-[16px]',
                                'flex justify-center items-center gap-3',
                                'w-full',
                                'text-sm font-medium',
                                'shadow-default rounded cursor-pointer',
                                'bg-warn-100 text-warn-600',
                            ].join(' ')}
                                onClick={() => {

                                }}
                            >
                                <FiInfo size='20px' />
                                <span className='whitespace-nowrap'>
                                    No Budget Set for this Month.
                                </span>
                            </div>
                            {/* <Alert dummy variant={'info'} message={'No Budget Set for this Month.'} /> */}
                            {/* <Button>Set Now!</Button> */}
                            {/* <span className='text-sm'>
                                No Budget Set for this Month
                            </span> */}
                            <span className='text-primary-600 cursor-pointer font-medium self-center text-sm mt-2' onClick={() => setAddBudgetModalOpen(true)}>
                                Set a Budget
                            </span>
                        </div>
                    )
                )
            }
            <AddMonthlyBudgetModal title={'Add Budget'} currentMonth={currentMonth} isOpen={addBudgetModalOpen} onClose={() => setAddBudgetModalOpen(false)} />
        </div>
    )
}

export default CurrentMonthBudget

const AddMonthlyBudgetModal = ({
    isOpen,
    title,
    onClose,
    currentMonth
}) => {
    const { user } = useAuth()
    const { displayAlert } = useGlobals()

    const [errors, setErrors] = useState({})
    const [allowSubmit, setAllowSubmit] = useState(false)

    const [loading, setLoading] = useState(false)

    const [amount, setAmount] = useState('')

    const { checkNumber } = useValidation()

    const handleAddBudget = () => {
        setLoading(true)
        setDoc(doc(db, 'users', user.uid, 'budgets', currentMonth), {
            amount: Number(amount),
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        }, {
            merge: true
        }).then(() => {
            setLoading(false)
            displayAlert(true, 'success', 'Budget Added')
            onClose()
        }).catch((error) => {
            setLoading(false)
            displayAlert(true, 'error', error.message)
        })
    }

    return (
        <Modal
            title={title}
            isOpen={isOpen}
            onClose={onClose}
        >
            <Form
                allowSubmit={allowSubmit}
                errors={errors}
                setAllowSubmit={setAllowSubmit}
                onSubmit={handleAddBudget}
                className='w-full flex flex-col gap-2'
            >
                <Input
                    id={'amount'}
                    name={'amount'}
                    type={'text'}
                    placeholder={'Enter Amount'}
                    value={amount}
                    onChange={(e) => {
                        setAmount(e.target.value)
                        checkNumber(e.target.value, 'amount', errors, setErrors, true, 0)
                    }}
                    status={errors?.amount?.status}
                    helperText={errors?.amount?.helperText}
                    showHelperText={errors?.amount?.helperText}
                    required
                    disabled={loading}
                />
                <Button
                    className={'w-full'}
                    disabled={loading || !allowSubmit}
                    type='submit'
                    onSubmit={handleAddBudget}
                    iconLeft={loading && <FiLoader size={18} className='animate-spin' />}
                >
                    {

                        !loading && 'Add Budget'
                    }

                </Button>
            </Form>
        </Modal>
    )
}