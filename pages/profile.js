import React from 'react'
import { privateRoute } from '@/Routes/privateRoute'
import { PageScreen } from '@/Components/app'
import { Button, Text } from '@/Components/utility'
import { FiLogOut } from 'react-icons/fi'

const Profile = ({ auth }) => {
    const { user, logOut } = auth
    return (
        <PageScreen
            label='Profile'
        >
            <Text tag='h4'>
                Profile
            </Text>
            {user &&
                <Button
                    color='error'
                    iconLeft={<FiLogOut />}
                    onClick={logOut}
                >
                    Log Out
                </Button>}
        </PageScreen>
    )
}

export default privateRoute(Profile)