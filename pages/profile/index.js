import React, { useState } from 'react'
import useAuth from '@/Contexts/useAuth'
import { privateRoute } from '@/Routes/privateRoute'
import { PageScreen } from '@/Components/app'
import { Button, Link, Modal, Seperator, Spacer } from '@/Components/utility'
import { FiInfo, FiLogOut } from 'react-icons/fi'
import { MdOutlineBugReport } from 'react-icons/md'
import { PhoneNumberForm, ProfilePictureUpload, UserProfile } from '@/Components/pages/profile'

const Profile = () => {

    // Auth Context 
    const { logOut, userData } = useAuth()

    // Modal Controls
    const [addPhoneNumberModal, setAddPhoneNumberModal] = useState(false)
    const [editProfilePictureModal, setEditProfilePictureModal] = useState(false)

    return (
        <PageScreen title='Profile' className='items-center'>
            <div className="flex-1 w-full">
                <Spacer h='24px' />

                {/* User Profile */}
                <UserProfile
                    userData={userData}
                    addPhoneBannerOnClick={() => setAddPhoneNumberModal(!addPhoneNumberModal)}
                    profilePictureOnClick={() => setEditProfilePictureModal(!editProfilePictureModal)}
                />

                <Seperator h='24px' />

                {/* Logout Button */}
                <Button
                    color='error'
                    iconLeft={<FiLogOut />}
                    onClick={logOut}
                    className='w-full self-start'>
                    Log Out
                </Button>
            </div>
            <div className="flex flex-col gap-2">
                <Link
                    href={'/app-info'}
                    color='secondary'
                    iconLeft={<FiInfo />}
                >
                    app info
                </Link>
                <Link
                    href={'https://twitter.com/trehansangpriya'}
                    color='secondary'
                    target='_blank'
                    iconLeft={<MdOutlineBugReport size={18} />}
                >
                    report a bug
                </Link>
            </div>

            {/* PhoneNumber Form Modal */}
            <Modal
                isOpen={addPhoneNumberModal}
                onClose={() => setAddPhoneNumberModal(false)}
                title={'Add Phone Number'}>
                <PhoneNumberForm afterSubmitActions={() => setAddPhoneNumberModal(false)} />
            </Modal>

            {/* Edit Profile Picture Modal */}
            <Modal
                isOpen={editProfilePictureModal}
                onClose={() => setEditProfilePictureModal(false)}
                title={'Edit Profile Picture'}>
                <ProfilePictureUpload afterSubmitActions={() => setEditProfilePictureModal(false)} />
            </Modal>

        </PageScreen>
    )
}

export default privateRoute(Profile)