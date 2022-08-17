import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Loading, Select, SelectOption } from '@/Components/utility'
import useValidation from '@/Hooks/useValidation'
import accountTypes from '@/Data/accountTypes'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/Firebase/index'
import useAuth from '@/Contexts/useAuth'
import useGlobals from '@/Contexts/useGlobals'

const AccountForm = ({
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

    // Form Data States
    const [accountName, setAccountName] = useState('')
    const [accountType, setAccountType] = useState('')
    const [accountOpeningBalance, setAccountOpeningBalance] = useState('')
    const [accountDescription, setAccountDescription] = useState('')
    const [accountCreditLimit, setAccountCreditLimit] = useState('')

    // useValidation Hook
    const { checkEmpty, checkNumber } = useValidation()

    // Handle Form Submit : Add Account to Firebase
    const handleAddAccount = (e) => {
        setLoading(true)
        setErrors({})
        setAllowSubmit(false)
        if (task === 'add') {
            // Add Account to Firebase
            addDoc(collection(db, 'users', user.uid, 'accounts'), {
                accountName,
                accountType,
                // if accountType is credit, add accountCreditLimit
                ...(accountType === 'Credit Card' && { accountCreditLimit: +accountCreditLimit }),
                // if accountType is not credit, add accountOpeningBalance
                ...(accountType !== 'Credit Card' && { accountOpeningBalance: +accountOpeningBalance }),
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
        } else if (task === 'edit') {
            // Edit Account in Firebase
        }
    }
    useEffect(() => {
        // delete accountCreditLimit and accountOpeningBalance from errors object
        const { accountCreditLimit, accountOpeningBalance, ...rest } = errors
        setErrors(rest)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accountType])
    return (
        <Form className='flex flex-col gap-3 justify-center items-center' errors={errors} allowSubmit={allowSubmit} setAllowSubmit={setAllowSubmit} onSubmit={handleAddAccount} >
            <Input
                id={'accountName'}
                label={'Account Name'}
                placeholder={'Enter Account Name'}
                name={'accountName'}
                type={'text'}
                value={accountName}
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
                label={'Account Description (if any)'}
                placeholder={'Enter Account Description'}
                name={'accountDescription'}
                type={'text'}
                value={accountDescription}
                onChange={(e) => {
                    setAccountDescription(e.target.value)
                }}
                disabled={loading}
                required={false}
            />
            <Select
                id={'accountType'}
                label={'Account Type'}
                placeholder={'Select Account Type'}
                name={'accountType'}
                value={accountType}
                onChange={(e) => {
                    setAccountType(e.target.value)
                    checkEmpty(e.target.value, 'accountType', errors, setErrors)
                    setAccountCreditLimit('')
                    setAccountOpeningBalance('')
                }}
                status={errors?.accountType?.status}
                helperText={errors?.accountType?.helperText}
                showHelperText={errors?.accountType?.helperText}
                disabled={loading}
            >
                {
                    accountTypes.map((accountType, index) => (
                        <SelectOption key={index} value={accountType} >
                            {accountType}
                        </SelectOption>
                    ))
                }
            </Select>
            {
                accountType === 'Credit Card' && (
                    <Input
                        id={'accountCreditLimit'}
                        label={'Credit Limit'}
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
                        label={'Opening Balance'}
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
            >
                Add Account
            </Button>
            {
                loading && (
                    <Loading inline message={'Adding'} />
                )
            }
        </Form>
    )
}

export default AccountForm