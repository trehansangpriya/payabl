import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Link, Pill, SearchSelect, Spacer } from '@/Components/utility'
import useAuth from '@/Contexts/useAuth'
import useGlobals from '@/Contexts/useGlobals'
import useValidation from '@/Hooks/useValidation'
import { FiArrowLeft, FiDownload, FiLoader, FiUpload, FiX } from 'react-icons/fi'
import { addDoc, collection, doc, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '@/Firebase/index'
import useAccountCalculations from '@/Hooks/useAccountCalculations'
import Image from 'next/image'
import CategoryModalForm from '../CategoryModalForm'
import { accountPillColors } from '@/Data/accountTypes'
import dayjs from 'dayjs'
import { NotFound } from '@/Components/app'

const AddTransactionForm = ({
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
    // console.log('errors', errors)
    const [allowSubmit, setAllowSubmit] = useState(false)

    // PageIndex State
    const [pageIndex, setPageIndex] = useState(0)
    const pages = [
        'Select Transaction Type',
        'Select Account',
        'Enter Transaction Details',
    ]

    const transactionTypes = [
        'Income',
        'Expense',
    ]

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
    // console.log('tempCategoryName', tempCategoryName)

    // States - title, date, amount, type, accountID, category, notes
    // Form Data States
    const [transactionTitle, setTransactionTitle] = useState('')
    const [transactionDate, setTransactionDate] = useState(
        dayjs().format('YYYY-MM-DD')
    )
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
    }, [user?.uid])

    useEffect(() => {
        setSelectedAccountBalance(accountBalance(allTransactions.filter(txn => txn.txnAccount === transactionAccount.id), transactionAccount.type === 'Credit Card' ? transactionAccount.creditLimit : transactionAccount.openingBalance))
        // setSelectedAccountBalance(transactionAccount.type === 'Credit Card' ? transactionAccount.creditLeft : transactionAccount.balance)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transactionAccount])

    useEffect(() => {
        if (tempCategoryName.length === 0) {
            // remove transactionCategory key from errors object
            setErrors(prevState => {
                const { transactionCategory, ...rest } = prevState
                return rest
            })
        }
        if (tempCategoryName.length > 0 && transactionCategory === '') {
            setErrors({
                ...errors,
                transactionCategory: {
                    status: 'error',
                    helperText: 'Click/Press Enter to select.'
                }
            })
            return
        }
        if (transactionCategory !== '') {
            setErrors({
                ...errors,
                transactionCategory: {
                    status: 'success',
                    helperText: ''
                }
            })
            return
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tempCategoryName, transactionCategory])

    // Handle Form Submit : Add Transaction to Firebase
    const handleAddTransaction = (e) => {
        setLoading(true)
        setErrors({})
        setAllowSubmit(false)
        if (transactionCategory === '') {
            setErrors({
                ...errors, transactionCategory: {
                    status: 'error',
                    helperText: 'Please click to select a category'
                }
            })
            // console.log('errors', errors)
            setLoading(false)
            return
        };
        // Add Transaction to Firebase
        // console.log('add transaction')
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
            // console.log(err)
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
    }


    return accounts.length !== 0 ? (
        <div className='w-full h-[100%] flex flex-col'>
            <Spacer h={'24px'} />
            <div className="flex-1 h-full overflow-y-scroll">
                <div className='w-full h-full  flex flex-col items-center'>
                    <h2 className='text-lg flex gap-2 w-[90%] font-medium items-center'>
                        {
                            pageIndex > 0 && (
                                <span
                                    className='cursor-pointer'
                                    onClick={() => setPageIndex(p => p - 1)}
                                >
                                    <FiArrowLeft />
                                </span>
                            )
                        }
                        <span>
                            {pages[pageIndex]}
                        </span>
                    </h2>
                    <Spacer h={'24px'} />

                    {/* Page 1 - Select Transaction Type */}
                    {
                        pageIndex === 0 && (
                            <>
                                <div className="flex flex-col select-none gap-2 w-[90%]">
                                    {
                                        transactionTypes.map((type, index) => (
                                            <div className={[
                                                'flex items-center justify-center p-3 rounded cursor-pointer gap-2 transition-all duration-300',
                                                ' border-2 border-layout-200 hover:brightness-95',
                                                type === 'Income' ? 'hover:bg-success-100 hover:border-success-200 hover:text-success-600' : 'hover:bg-error-100 hover:border-error-200 hover:text-error-600',
                                                'active:scale-95',
                                                transactionType === type && transactionType === 'Income' && 'bg-success-100 border-success-200 text-success-600',
                                                transactionType === type && transactionType === 'Expense' && 'bg-error-100 border-error-200 text-error-600',
                                            ].join(' ')}
                                                key={index}
                                                onClick={() => {
                                                    setTransactionType(type)
                                                    setPageIndex(p => p + 1)
                                                }}
                                            >
                                                {
                                                    type === 'Income' && (
                                                        <FiDownload className='text-2xl' />
                                                    )
                                                }
                                                {
                                                    type === 'Expense' && (
                                                        <FiUpload className='text-2xl' />
                                                    )
                                                }
                                                <span className='flex-1 text-lg font-medium'>
                                                    {type}
                                                </span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </>
                        )
                    }
                    {/* Page 2 - Select Transaction Account */}
                    {
                        pageIndex === 1 && (
                            <>
                                <div className="flex flex-col select-none gap-2 w-[90%]">
                                    {
                                        accounts.map((account, index) => (
                                            <div className={[
                                                'flex items-center justify-center p-3 rounded cursor-pointer gap-2 transition-all duration-300',
                                                ' border-2 border-layout-200 hover:brightness-95',
                                                'hover:bg-primary-50',
                                                'active:scale-95',
                                                transactionAccount.id === account.id && 'bg-primary-50 border-2 border-primary-500',
                                            ].join(' ')}
                                                key={index}
                                                onClick={() => {
                                                    setTransactionAccount(account)
                                                    setPageIndex(p => p + 1)
                                                }}
                                            >
                                                <div className='flex justify-center items-center'>
                                                    <Image
                                                        src={`/assets/icons/accountTypes/${account.type.replace(/\s/g, '').toLowerCase()}.png`}
                                                        width={36}
                                                        height={36}
                                                        alt={account}
                                                        layout='fixed'
                                                    />
                                                </div>
                                                <span className='flex-1 text-lg font-medium'>
                                                    {account.name}
                                                </span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </>
                        )
                    }
                    {/* Page 3 - Enter Transaction Details */}
                    <Form className=' w-full max-w-full flex flex-col justify-center items-center' wFull errors={errors} allowSubmit={allowSubmit} setAllowSubmit={setAllowSubmit} onSubmit={handleAddTransaction}>
                        {
                            pageIndex === 2 && (
                                <>
                                    <div className='w-[90%] flex flex-col gap-3'>
                                        <div className='flex w-full gap-2 items-center'>
                                            {
                                                transactionType && (
                                                    <Pill
                                                        size='12px'
                                                        icon={
                                                            transactionType === 'Income' ? (<FiDownload />) : (<FiUpload />)
                                                        }
                                                        color={transactionType === 'Income' ? 'success' : 'error'}
                                                    >
                                                        {transactionType}
                                                    </Pill>
                                                )
                                            }
                                            {
                                                transactionAccount.id && (
                                                    <Pill
                                                        size='12px'
                                                        color={accountPillColors[transactionAccount.type]}
                                                        icon={
                                                            <Image
                                                                src={`/assets/icons/accountTypes/${transactionAccount.type?.replace(/\s/g, '').toLowerCase()}.png`}
                                                                width={18}
                                                                height={18}
                                                                alt={transactionAccount.type}
                                                                layout='fixed'
                                                            />
                                                        }
                                                    >
                                                        {transactionAccount.name}
                                                    </Pill>
                                                )
                                            }
                                            {
                                                selectedAccountBalance && (

                                                    <Pill
                                                        size='12px'
                                                    >
                                                        {
                                                            transactionAccount.type === 'Credit Card'
                                                                ? <span>Credit Left:</span>
                                                                : <span>Balance:</span>
                                                        }
                                                        ₹{selectedAccountBalance}
                                                    </Pill>
                                                )
                                            }

                                        </div>

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
                                                    {
                                                        transactionCategory ?
                                                            <div className='flex flex-col w-full gap-2 items-start justify-center'>
                                                                <span className='text-sm ml-1'>Category</span>
                                                                <Pill
                                                                    className='cursor-pointer'
                                                                    onClick={() => {
                                                                        setTransactionCategory('')
                                                                        setTempCategoryName('')
                                                                    }} icon={<span>{transactionCategory.emoji}</span>}>{transactionCategory.name} <FiX /></Pill>
                                                            </div>
                                                            :
                                                            <SearchSelect
                                                                label={'Category'}
                                                                name={'transactionCategory'}
                                                                placeholder={'Enter Category'}
                                                                data={categories}
                                                                disabled={loading || transactionCategory}
                                                                display={['name', 'emoji']}
                                                                search={['name']}
                                                                noResultsText={'No Categories Found'}
                                                                noResults={() => setShowAddCategoryModal(true)}
                                                                required={true}
                                                                status={errors?.transactionCategory?.status}
                                                                helperText={
                                                                    errors?.transactionCategory?.helperText ||
                                                                    'Start typing to search for a category'
                                                                }
                                                                onChange={(e) => {
                                                                    setTempCategoryName(e.target.value)
                                                                }}
                                                                select={(category) => {
                                                                    setTransactionCategory(category)
                                                                }}
                                                                enterToSelect={true}
                                                            />
                                                    }
                                                    <CategoryModalForm
                                                        isOpen={showAddCategoryModal}
                                                        onClose={() => setShowAddCategoryModal(false)}
                                                        title={'Add New Category'}
                                                        text={tempCategoryName}
                                                        setTransactionCategory={setTransactionCategory}
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
                                    </div>
                                </>
                            )
                        }
                    </Form>
                </div>
            </div>
            {/* Indicators */}
            <div className="flex items-center justify-center gap-2 p-3">
                {
                    pages.map((page, index) => (
                        <div
                            key={index}
                            className={[
                                'w-2 h-2 rounded-full bg-layout-200',
                                pageIndex === index && 'bg-primary-400',
                            ].join(' ')}
                        />
                    ))
                }
            </div>
        </div>
    ) : (
        <div className='text-center text-gray-500 p-3'>
            <NotFound message={
                <>
                    No accounts found! <br /> Please add an account first.
                </>
            } />
            <br />
            <Link
                href={'/accounts/add'}
                color='primary'
            >
                Add Account
            </Link>
        </div>
    )
}

export default AddTransactionForm