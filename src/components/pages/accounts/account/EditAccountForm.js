import React, { useState } from 'react'
import { Button, Form, Input } from '@/Components/utility'
import useValidation from '@/Hooks/useValidation'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '@/Firebase/index'
import useAuth from '@/Contexts/useAuth'
import useGlobals from '@/Contexts/useGlobals'
import { FiLoader } from 'react-icons/fi'

const EditAccountForm = ({
    afterSubmitActions = () => { },
    account,
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
    const [accountName, setAccountName] = useState(account.name)
    const [accountDescription, setAccountDescription] = useState(account.description)

    // useValidation Hook
    const { checkEmpty } = useValidation()

    // Handle Form Submit : Add Account to Firebase
    const handleAddAccount = (e) => {
        setLoading(true)
        setErrors({})
        setAllowSubmit(false)

        // Add Account to Firebase
        setDoc(doc(db, 'users', user.uid, 'accounts', account.id), {
            accountName,
            accountDescription,
            editedAt: serverTimestamp(),
        }, {
            merge: true,
        })
            .then(() => {
                displayAlert(true, 'success', 'Account Edited')
            })
            .catch(err => {
                displayAlert(true, 'error', err.message)
            })
            .finally(() => {
                setAccountName('')
                setAccountDescription('')
                setLoading(false)
                afterSubmitActions()
            })
    }

    return (
        <Form className='flex flex-col gap-3 justify-center items-center' errors={errors} allowSubmit={allowSubmit} setAllowSubmit={setAllowSubmit} onSubmit={handleAddAccount} >
            <Input
                id={'accountName'}
                label={'Account Name'}
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
            <Button
                type='submit'
                disabled={loading || !allowSubmit}
                className='w-full'
                iconLeft={loading && <FiLoader size={18} className='animate-spin' />}
            >
                {!loading && 'Edit Account'}
            </Button>
        </Form>
    )
}

export default EditAccountForm