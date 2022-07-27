import React, { useState } from 'react'
import { Button, Form, Input, Loading, Select, SelectOption } from '@/Components/utility'
import countryCodesData from '@/Data/countryCodesData'
import useValidation from '@/Hooks/useValidation'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '@/Firebase/index'
import useGlobals from '@/Contexts/useGlobals'
import useAuth from '@/Contexts/useAuth'


const PhoneNumberForm = ({
    afterSubmitActions = () => { },
}) => {
    // Auth Context 
    const { user } = useAuth()

    // Global Context
    const { displayAlert } = useGlobals()

    // Local Loading State
    const [loading, setLoading] = useState(false)

    // Validation Hook
    const { checkEmpty, checkPhoneNumber } = useValidation()

    // Form States
    const [errors, setErrors] = useState({})
    const [allowSubmit, setAllowSubmit] = useState(false)

    // Form Data States
    const [countryCode, setCountryCode] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    // Add Phone Number to Firebase
    const handleAddPhoneNumber = () => {
        console.log('Adding Phone Number:C')
        setLoading(true)
        setErrors({})
        setAllowSubmit(false)
        setDoc(doc(db, 'users', user.uid), {
            phoneNumber,
            countryCode,
            profileComplete: true,
            editedAt: serverTimestamp(),
        }, { merge: true })
            .then(() => {
                displayAlert(true, 'success', 'Phone Number Added Successfully')
            })
            .catch(err => {
                displayAlert(true, 'error', err.message)
            })
            .finally(() => {
                setLoading(false)
                setCountryCode('')
                setPhoneNumber('')
                afterSubmitActions()
            })
    }
    return (
        <Form
            className='flex flex-col gap-3'
            onSubmit={handleAddPhoneNumber}
            allowSubmit={allowSubmit}
            setAllowSubmit={setAllowSubmit}
            errors={errors}
        >
            <Select
                id='countryCode'
                label='Country Code'
                placeholder='Select Country Code'
                name='countryCode'
                value={countryCode}
                onChange={(e) => {
                    setCountryCode(e.target.value)
                    checkEmpty(e.target.value, 'countryCode', errors, setErrors)
                }}
                status={errors?.countryCode?.status}
                helperText={errors?.countryCode?.helperText}
                showHelperText={errors?.countryCode?.helperText}
                disabled={loading}

            >
                {countryCodesData.map((countryCode, index) => (
                    <SelectOption
                        key={index}
                        value={countryCode.dialCode}
                        className='text-sm'
                    >
                        ({countryCode.dialCode}) {countryCode.name}
                    </SelectOption>
                ))}
            </Select>
            <Input
                id='phoneNumber'
                type='tel'
                label='Phone Number'
                name='phoneNumber'
                placeholder='Enter Phone Number'
                value={phoneNumber}
                onChange={(e) => {
                    setPhoneNumber(e.target.value)
                    checkPhoneNumber(e.target.value, 'phoneNumber', errors, setErrors)
                }}
                status={errors?.phoneNumber?.status}
                helperText={errors?.phoneNumber?.helperText}
                showHelperText={errors?.phoneNumber?.helperText}
                disabled={loading}
            />
            <Button
                disabled={loading || !allowSubmit}
                type='submit'
            >
                Add Phone Number
            </Button>
            {
                loading && (
                    <Loading inline message={'Adding'} />
                )
            }
        </Form>
    )
}

export default PhoneNumberForm