import React from 'react'
import useAuth from '@/Contexts/useAuth'
import { privateRoute } from '@/Routes/privateRoute'
import { PageScreen } from '@/Components/app'
import { Button, Text } from '@/Components/utility'
import { FiLogOut } from 'react-icons/fi'

const Profile = () => {
    const { user, logOut } = useAuth()
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