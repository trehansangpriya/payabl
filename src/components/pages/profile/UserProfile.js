import React from 'react'
import { Avatar, Banner } from '@/Components/utility'
import countryCodesData from '@/Data/countryCodesData'
import { FiEdit } from 'react-icons/fi'

const UserProfile = ({
    userData,
    addPhoneBannerOnClick,
    profilePictureOnClick,
}) => {
    return (
        <div className='w-full px-2 flex flex-col gap-2'>
            {/* User Avatar */}
            <Avatar
                size='128px'
                text={userData.displayName}
                fontSize='36px'
                src={userData.photoURL}
                alt={userData.displayName}
                pointer
                onClick={profilePictureOnClick}
                bordered
                color='primary'
                borderIcon={<FiEdit />}
            />
            {/* User Name */}
            {
                userData.displayName && (
                    <h3 className='font-semibold text-2xl'>
                        {userData.displayName}
                    </h3>
                )
            }

            {/* User Email */}
            {
                userData.email && (
                    <p>
                        {userData.email}
                    </p>
                )
            }

            {/* User Phone (Country Code + Number) */}
            {
                userData.phoneNumber ? (
                    <p className='flex gap-1 items-center'>
                        <span>
                            {/* match countryCode to countryCodesData */}
                            {
                                countryCodesData.find(country => country.dialCode === userData.countryCode) && (

                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={
                                            countryCodesData.find(country => country.dialCode === userData.countryCode)?.flag
                                        }
                                        width='28px'
                                        alt=""
                                    />

                                )
                            }
                        </span>
                        <span>
                            ({userData.countryCode})
                        </span>
                        <span>
                            {userData.phoneNumber}
                        </span>
                    </p>
                ) : (
                    <Banner variant={'warn'} className='w-fit rounded cursor-pointer' onClick={addPhoneBannerOnClick} >
                        Add Phone Number
                    </Banner>
                )
            }
        </div>
    )
}

export default UserProfile