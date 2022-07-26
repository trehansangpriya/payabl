import { AppScreen } from '@/Components/app'
import { Text } from '@/Components/utility'
import { privateRoute } from '@/Routes/privateRoute'
import React from 'react'

const Accounts = () => {
    return (
        <AppScreen>
            <Text tag='h4'>
                Accounts
            </Text>
        </AppScreen>
    )
}

export default privateRoute(Accounts)