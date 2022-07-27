import React, { useState } from 'react'
import useAuth from '@/Contexts/useAuth'
import { privateRoute } from '@/Routes/privateRoute'
import { PageScreen } from '@/Components/app'
import { Avatar, Banner, Button, Form, Input, Loading, Modal, Select, SelectOption, Seperator, Spacer, Text } from '@/Components/utility'
import { FiLogOut } from 'react-icons/fi'
import countryCodesData from '@/Data/countryCodesData'
import useValidation from '@/Hooks/useValidation'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/Firebase/index'
import useGlobals from '@/Contexts/useGlobals'
import { UserProfile } from '@/Components/pages/profile'

const Profile = () => {
    // Auth Context 
    const { logOut, userData, user } = useAuth()

    // Global Context
    const { displayAlert } = useGlobals()

    // Validation Hook
    const { checkEmpty, checkPhoneNumber } = useValidation()

    // Local Loading State
    const [loading, setLoading] = useState(false)

    // Modal Controls
    const [addPhoneModal, setAddPhoneModal] = useState(false)

    // Form States
    const [errors, setErrors] = useState({})
    const [allowSubmit, setAllowSubmit] = useState(false)

    // Form Data States
    const [countryCode, setCountryCode] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    // Add Phone Number to Firebase
    const handleAddPhoneNumber = () => {
        console.log('Adding Phone Number')
        setLoading(true)
        setErrors({})
        setAllowSubmit(false)
        setDoc(doc(db, 'users', user.uid), {
            phoneNumber,
            countryCode,
            profileComplete: true
        }, { merge: true })
            .then(() => {
                setLoading(false)
                setAddPhoneModal(false)
                displayAlert(true, 'success', 'Phone Number Added Successfully')
            })
            .catch(err => {
                setLoading(false)
                setAddPhoneModal(false)
                displayAlert(true, 'error', err.message)
            })
            .finally(() => {
                setLoading(false)
                setAddPhoneModal(false)
                setCountryCode('')
                setPhoneNumber('')
            })
    }
    return (
        <PageScreen
            label='Profile'
            className='items-center'
        >
            <Spacer h='24px' />

            {/* User Profile */}
            <UserProfile
                userData={userData}
                addPhoneBannerOnClick={() => setAddPhoneModal(!addPhoneModal)}
            />

            <Seperator h='24px' />

            {/* Logout Button */}
            <Button
                color='error'
                iconLeft={<FiLogOut />}
                onClick={logOut}
                className='w-full'
            >
                Log Out
            </Button>

            {/* PhoneNumber Form Modal */}
            <Modal
                isOpen={addPhoneModal}
                onClose={() => setAddPhoneModal(false)}
                title={'Add Phone Number'}
                className='justify-center'
            >
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
            </Modal>
        </PageScreen>
    )
}

export default privateRoute(Profile)

// <>
// {/* User Avatar */}
// <Avatar
//     size='128px'
//     text={userData.displayName}
//     fontSize='36px'
//     src={userData.photoURL}
//     alt={userData.displayName}
//     pointer
// />
// {/* User Name */}
// {
//     userData.displayName && (
//         <h3 className='font-semibold text-2xl'>
//             {userData.displayName}
//         </h3>
//     )
// }

// {/* User Email */}
// {
//     userData.email && (
//         <p>
//             {userData.email}
//         </p>
//     )
// }

// {/* User Phone (Country Code + Number) */}
// {
//     userData.phoneNumber ? (
//         <p className='flex gap-1 items-center'>
//             <span>
//                 {/* match countryCode to countryCodesData */}
//                 {
//                     countryCodesData.find(country => country.dialCode === userData.countryCode) && (

//                         // eslint-disable-next-line @next/next/no-img-element
//                         <img
//                             src={
//                                 countryCodesData.find(country => country.dialCode === userData.countryCode)?.flag
//                             }
//                             width='28px'
//                             alt=""
//                         />

//                     )
//                 }
//             </span>
//             <span>
//                 ({userData.countryCode})
//             </span>
//             <span>
//                 {userData.phoneNumber}
//             </span>
//         </p>
//     ) : (
//         <Banner variant={'warn'} className='w-fit rounded cursor-pointer' onClick={() => setAddPhoneModal(!addPhoneModal)} >
//             Add Phone Number
//         </Banner>
//     )
// }
// </>