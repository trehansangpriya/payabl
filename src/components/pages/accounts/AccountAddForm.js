import React, { useEffect, useState } from 'react'
import useAuth from '@/Contexts/useAuth'
import useGlobals from '@/Contexts/useGlobals'
import { Button, Form, Input, Spacer } from '@/Components/utility'
import accountTypes, { accountPillColors } from '@/Data/accountTypes'
import Image from 'next/image'
import { FiArrowLeft, FiLoader } from 'react-icons/fi'
import useValidation from '@/Hooks/useValidation'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/Firebase/index'

const AccountAddForm = ({
    afterSubmitActions = () => { },
}) => {
    // Auth Context
    const { user } = useAuth()

    // Global Context
    const { displayAlert } = useGlobals()

    // Local Loading State
    const [loading, setLoading] = useState(false)

    // PageIndex State
    const [pageIndex, setPageIndex] = useState(0)
    const pages = [
        'Select Account Type',
        'Enter Account Details',
    ]
    // Form States
    const [errors, setErrors] = useState({})
    const [allowSubmit, setAllowSubmit] = useState(false)

    // useValidation Hook
    const { checkEmpty, checkNumber } = useValidation()

    // Form Data States
    const [accountName, setAccountName] = useState('')
    const [accountType, setAccountType] = useState('')
    const [accountOpeningBalance, setAccountOpeningBalance] = useState('')
    const [accountDescription, setAccountDescription] = useState('')
    const [accountCreditLimit, setAccountCreditLimit] = useState('')


    // Handle Form Submit : Add Account to Firebase
    const handleAddAccount = (e) => {
        setLoading(true)
        setErrors({})
        setAllowSubmit(false)

        // Add Account to Firebase
        addDoc(collection(db, 'users', user.uid, 'accounts'), {
            accountName,
            accountType,
            // if accountType is credit, add accountCreditLimit
            ...(accountType === 'Credit Card' && {
                accountCreditLimit: +accountCreditLimit,
            }),
            // if accountType is not credit, add accountOpeningBalance
            ...(accountType !== 'Credit Card' && {
                accountOpeningBalance: +accountOpeningBalance,
            }),
            accountDescription,
            createdAt: serverTimestamp(),
        })
            .then(() => {
                displayAlert(true, 'success', 'Account Added')
            })
            .catch(err => {
                displayAlert(true, 'error', err.message)
            })
            .finally(() => {
                setAccountName('')
                setAccountType('')
                setAccountOpeningBalance('')
                setAccountDescription('')
                setAccountCreditLimit('')
                setLoading(false)
                afterSubmitActions()
            })
    }


    useEffect(() => {
        // delete accountCreditLimit and accountOpeningBalance from errors object
        const { accountCreditLimit, accountOpeningBalance, ...rest } = errors
        setErrors(rest)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accountType])

    return (
        <div className='w-full h-[80%] flex flex-col'>
            <div className="flex-1">
                <div className='w-full h-full flex flex-col items-center justify-center'>
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
                    <Spacer h='24px' />

                    {
                        pageIndex === 0 && (
                            <>
                                <div className="flex flex-wrap w-full gap-2 justify-center select-none">
                                    {
                                        accountTypes.map((account, index) => (
                                            <div className={[
                                                'flex flex-col items-start p-3 w-[45%] rounded cursor-pointer gap-2 transition-all duration-300',
                                                ' border-2 border-layout-200',
                                                'hover:bg-primary-50',
                                                'active:scale-95',
                                                accountType === account && 'bg-primary-50 border-2 border-primary-500',
                                            ].join(' ')}
                                                key={index}
                                                onClick={() => {
                                                    setAccountType(account)
                                                    setPageIndex(p => p + 1)
                                                    setAccountCreditLimit('')
                                                    setAccountOpeningBalance('')
                                                }}
                                            >
                                                <div className='flex justify-center items-center'>
                                                    <Image
                                                        src={`/assets/icons/accountTypes/${account.replace(/\s/g, '').toLowerCase()}.png`}
                                                        width={36}
                                                        height={36}
                                                        alt={account}
                                                        layout='fixed'
                                                    />
                                                </div>
                                                <div className='text-sm font-semibold text-layout-700'>
                                                    {account}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </>
                        )
                    }
                    <Form className=' w-full max-w-full flex flex-col justify-center items-center' wFull errors={errors} allowSubmit={allowSubmit} setAllowSubmit={setAllowSubmit} onSubmit={handleAddAccount}>
                        {
                            pageIndex === 1 && (
                                <div className='w-[90%] flex flex-col gap-3'>
                                    <Input
                                        id={'accountName'}
                                        // label={'Account Name'}
                                        placeholder={'Enter Account Name'}
                                        name={'accountName'}
                                        type={'text'}
                                        value={accountName}
                                        maxLength={15}
                                        onChange={(e) => {
                                            setAccountName(e.target.value)
                                            checkEmpty(e.target.value, 'accountName', errors, setErrors)
                                        }}
                                        status={errors?.accountName?.status}
                                        helperText={errors?.accountName?.helperText}
                                        showHelperText={errors?.accountName?.helperText}
                                        disabled={loading}
                                    />
                                    <Input
                                        id={'accountDescription'}
                                        // label={'Account Description (if any)'}
                                        placeholder={'Enter Account Description (if any)'}
                                        name={'accountDescription'}
                                        type={'text'}
                                        value={accountDescription}
                                        onChange={(e) => {
                                            setAccountDescription(e.target.value)
                                        }}
                                        disabled={loading}
                                        required={false}
                                    />
                                    {
                                        accountType === 'Credit Card' && (
                                            <Input
                                                id={'accountCreditLimit'}
                                                // label={'Credit Limit'}
                                                placeholder={'Enter Credit Limit'}
                                                name={'accountCreditLimit'}
                                                type={'text'}
                                                value={accountCreditLimit}
                                                onChange={(e) => {
                                                    setAccountCreditLimit(e.target.value)
                                                    checkNumber(e.target.value, 'accountCreditLimit', errors, setErrors)
                                                }}
                                                status={errors?.accountCreditLimit?.status}
                                                helperText={errors?.accountCreditLimit?.helperText}
                                                showHelperText={errors?.accountCreditLimit?.helperText}
                                                disabled={loading}
                                            />
                                        )
                                    }
                                    {
                                        accountType !== 'Credit Card' && (
                                            <Input
                                                id={'accountOpeningBalance'}
                                                // label={'Opening Balance'}
                                                placeholder={'Enter Opening Balance'}
                                                name={'accountOpeningBalance'}
                                                type={'text'}
                                                value={accountOpeningBalance}
                                                onChange={(e) => {
                                                    setAccountOpeningBalance(e.target.value)
                                                    checkNumber(e.target.value, 'accountOpeningBalance', errors, setErrors, true, -1)
                                                }}
                                                status={errors?.accountOpeningBalance?.status}
                                                helperText={errors?.accountOpeningBalance?.helperText}
                                                showHelperText={errors?.accountOpeningBalance?.helperText}
                                                disabled={loading}
                                            />
                                        )
                                    }
                                    <Button
                                        type='submit'
                                        disabled={loading || !allowSubmit}
                                        className='w-full'
                                        iconLeft={loading && <FiLoader size={18} className='animate-spin' />}
                                    >
                                        {!loading && 'Add Account'}
                                    </Button>
                                </div>
                            )
                        }
                    </Form>
                </div>
            </div>
            {/* Indicators */}
            <div className="flex items-center justify-center gap-2">
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
    )
}

export default AccountAddForm