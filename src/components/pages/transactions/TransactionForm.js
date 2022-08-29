import React, { useEffect, useState } from 'react'
import useAuth from '@/Contexts/useAuth'
import useGlobals from '@/Contexts/useGlobals'
import { Button, Form, Input, Pill, SearchSelect, Select, SelectOption } from '@/Components/utility'
import useValidation from '@/Hooks/useValidation'
import transactionTypes from '@/Data/transactionTypes'
import { addDoc, collection, doc, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '@/Firebase/index'
import { CategoryModalForm } from '@/Components/pages/transactions'
import { FiLoader, FiX, FiXCircle } from 'react-icons/fi'
import useAccountCalculations from '@/Hooks/useAccountCalculations'

const TransactionForm = ({
    task,
    afterSubmitActions = () => { },
}) => {
    // Auth Context
    const { user } = useAuth()

    // Global Context
    const { displayAlert } = useGlobals()

    // Local Loading State
    const [loading, setLoading] = useState(false)

    // Form States
    const [errors, setErrors] = useState({})
    const [allowSubmit, setAllowSubmit] = useState(false)


    // User Accounts
    const [accounts, setAccounts] = useState([])

    // Selected Account Balance
    const [selectedAccountBalance, setSelectedAccountBalance] = useState(0)
    // console.log('selectedAccountBalance', selectedAccountBalance)

    // User Categories
    const [categories, setCategories] = useState([])

    // User Transactions
    const [allTransactions, setAllTransactions] = useState([])

    // Show Add Category Modal
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false)
    const [tempCategoryName, setTempCategoryName] = useState('')

    // States - title, date, amount, type, accountID, category, notes
    // Form Data States
    const [transactionTitle, setTransactionTitle] = useState('')
    const [transactionDate, setTransactionDate] = useState('')
    const [transactionAmount, setTransactionAmount] = useState('')
    const [transactionType, setTransactionType] = useState('')
    const [transactionAccount, setTransactionAccount] = useState('')
    const [transactionCategory, setTransactionCategory] = useState('')
    const [transactionNote, setTransactionNote] = useState('')

    // useValidation Hook
    const { checkEmpty, checkAmount } = useValidation()

    // useAccountCalculations Hook
    const { accountBalance } = useAccountCalculations()

    useEffect(() => {
        setLoading(true)

        onSnapshot(collection(db, 'users', user.uid, 'accounts'), snap => {
            setAccounts(snap.docs.map(doc => ({
                id: doc.id,
                name: doc.data().accountName,
                type: doc.data().accountType,
                openingBalance: doc.data().accountOpeningBalance,
                creditLimit: doc.data().accountCreditLimit,
            })))
        })
        onSnapshot(collection(db, 'users', user.uid, 'categories'), snap => {
            setCategories(snap.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name,
                emoji: doc.data().emoji
            })))
        })
        onSnapshot(collection(db, 'users', user.uid, 'transactions'), snap => {
            setAllTransactions(snap.docs.map(doc => ({
                id: doc.id,
                txnType: doc.data().transactionType,
                txnAmount: doc.data().transactionAmount,
                txnAccount: doc.data().transactionAccountID,
            })))
        })
        setLoading(false)
    }, [user?.uid, task])

    useEffect(() => {
        setSelectedAccountBalance(accountBalance(allTransactions.filter(txn => txn.txnAccount === transactionAccount.id), transactionAccount.type === 'Credit Card' ? transactionAccount.creditLimit : transactionAccount.openingBalance))
        // setSelectedAccountBalance(transactionAccount.type === 'Credit Card' ? transactionAccount.creditLeft : transactionAccount.balance)
    }, [transactionAccount])

    // Handle Form Submit : Add Transaction to Firebase
    const handleAddTransaction = (e) => {
        setLoading(true)
        setErrors({})
        setAllowSubmit(false)
        if (task === 'add') {
            // Add Transaction to Firebase
            console.log('add transaction')
            addDoc(collection(db, 'users', user.uid, 'transactions'), {
                transactionTitle: transactionTitle,
                transactionDate: new Date(transactionDate),
                transactionAmount: +transactionAmount,
                transactionType: transactionType,
                transactionAccountID: transactionAccount.id,
                transactionCategoryID: transactionCategory.id,
                transactionNote: transactionNote,
            }).then(() => {
                displayAlert(true, 'success', 'Transaction Added')
            }).catch(err => {
                displayAlert(true, 'error', err.message)
                console.log(err)
            }).finally(() => {
                // clear fields
                setTransactionTitle('')
                setTransactionDate('')
                setTransactionAmount('')
                setTransactionType('')
                setTransactionAccount('')
                setTransactionCategory('')
                setTransactionNote('')
                setLoading(false)
                afterSubmitActions()
            })
        } else if (task === 'edit') {
            // Edit Transaction in Firebase
            console.log('edit transaction')
        }
    }

    return (
        <Form
            className='flex flex-col items-center justify-center gap-3'
            errors={errors}
            allowSubmit={allowSubmit}
            setAllowSubmit={setAllowSubmit}
            onSubmit={handleAddTransaction}
        >
            <Select
                id={'transactionType'}
                label={'Type'}
                name={'transactionType'}
                placeholder={'Select Transaction Type'}
                value={transactionType}
                onChange={(e) => {
                    setTransactionType(e.target.value)
                    checkEmpty(e.target.value, 'transactionType', errors, setErrors)
                }}
                status={errors?.transactionType?.status}
                helperText={errors?.transactionType?.helperText}
                showHelperText={errors?.transactionType?.helperText}
                disabled={loading}
            >
                {
                    transactionTypes.map((type, index) => (
                        <SelectOption key={index} value={type}>{type}</SelectOption>
                    ))
                }
            </Select>
            <Select
                id={'transactionAccount'}
                label={'Account'}
                name={'transactionAccount'}
                placeholder={'Select Account'}
                value={transactionAccount.index}
                onChange={(e) => {
                    if (e.target.value !== '') {
                        setTransactionAccount({
                            index: e.target.value,
                            ...accounts[e.target.value]
                        })
                    } else {
                        setTransactionAccount(e.target.value)
                    }
                    checkEmpty(e.target.value, 'transactionAccount', errors, setErrors)
                    // clear fields
                    setTransactionCategory('')
                    setTransactionNote('')
                    setTransactionDate('')
                    setTransactionAmount('')
                    setTransactionTitle('')
                }}
                status={errors?.transactionAccount?.status}
                helperText={errors?.transactionAccount?.helperText}
                showHelperText={errors?.transactionAccount?.helperText}
                disabled={loading}
            >
                {
                    accounts.map((account, index) => (
                        <SelectOption key={index} value={index}>
                            {account.name}
                        </SelectOption>
                    ))
                }
            </Select>
            {
                transactionAccount && (
                    <>
                        <Input
                            id={'transactionTitle'}
                            label={'Title'}
                            type={'text'}
                            placeholder={'Enter Transaction Title'}
                            name={'transactionTitle'}
                            value={transactionTitle}
                            onChange={(e) => {
                                setTransactionTitle(e.target.value)
                                checkEmpty(e.target.value, 'transactionTitle', errors, setErrors)
                            }}
                            status={errors?.transactionTitle?.status}
                            helperText={errors?.transactionTitle?.helperText}
                            showHelperText={errors?.transactionTitle?.helperText}
                            disabled={loading}
                        />
                        <Input
                            id={'transactionDate'}
                            label={'Date'}
                            type={'date'}
                            placeholder={'Enter Transaction Date'}
                            name={'transactionDate'}
                            value={transactionDate}
                            onChange={(e) => {
                                setTransactionDate(e.target.value)
                                checkEmpty(e.target.value, 'transactionDate', errors, setErrors)
                            }}
                            status={errors?.transactionDate?.status}
                            helperText={errors?.transactionDate?.helperText}
                            showHelperText={errors?.transactionDate?.helperText}
                            disabled={loading}
                            max={new Date().toISOString().split('T')[0]}
                        />
                        <Input
                            id={'transactionAmount'}
                            label={'Amount'}
                            type={'text'}
                            placeholder={'Enter Transaction Amount'}
                            name={'transactionAmount'}
                            value={transactionAmount}
                            onChange={(e) => {
                                setTransactionAmount(e.target.value)
                                checkAmount(e.target.value, 'transactionAmount', errors, setErrors, true, transactionType === 'Expense' ? true : false, selectedAccountBalance, "Account Balance ₹ ")
                            }}
                            status={errors?.transactionAmount?.status}
                            helperText={errors?.transactionAmount?.helperText}
                            showHelperText={errors?.transactionAmount?.helperText}
                            disabled={loading}
                        />
                        <SearchSelect
                            label={'Category'}
                            name={'transactionCategory'}
                            placeholder={'Select Category'}
                            data={categories}
                            disabled={loading || transactionCategory}
                            display={['name', 'emoji']}
                            search={['name']}
                            noResultsText={'No Categories Found'}
                            noResults={() => setShowAddCategoryModal(true)}
                            required={true}
                            onChange={(e) => {
                                setTempCategoryName(e.target.value)
                            }}
                            select={(category) => {
                                setTransactionCategory(category)
                            }}
                        />
                        {transactionCategory && <div className='flex w-full gap-2 items-center'>
                            <span>Selected: </span>
                            <Pill
                                className='cursor-pointer'
                                onClick={() => {
                                    setTransactionCategory('')
                                }} icon={<span>{transactionCategory.emoji}</span>}>{transactionCategory.name} <FiX /></Pill>
                        </div>}
                        <CategoryModalForm
                            isOpen={showAddCategoryModal}
                            onClose={() => setShowAddCategoryModal(false)}
                            title={'Add New Category'}
                            text={tempCategoryName}
                        />
                        <Input
                            id={'transactionNote'}
                            label={'Note'}
                            type={'text'}
                            placeholder={'Enter Transaction Note'}
                            name={'transactionNote'}
                            value={transactionNote}
                            onChange={(e) => {
                                setTransactionNote(e.target.value)
                            }}
                            disabled={loading}
                            required={false}
                        />
                        <Button
                            disabled={loading || !allowSubmit}
                            type='submit'
                            className='w-full'
                            iconLeft={loading && <FiLoader size={18} className='animate-spin' />}
                        >
                            {
                                !loading && 'Add Transaction'
                            }
                        </Button>
                    </>
                )
            }

        </Form>
    )
}

export default TransactionForm