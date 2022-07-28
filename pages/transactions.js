import { AppScreen } from '@/Components/app'
import { Text } from '@/Components/utility'
import { privateRoute } from '@/Routes/privateRoute'
import React from 'react'

const Transactions = () => {
    return (
        <AppScreen title={'Transactions'}>
            <Text tag='h4'>
                Transactions
            </Text>
        </AppScreen>
    )
}

export default privateRoute(Transactions)