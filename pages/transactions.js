import { AppScreen } from '@/Components/app'
import { privateRoute } from '@/Routes/privateRoute'
import React from 'react'

const Transactions = () => {
    return (
        <AppScreen>Transactions</AppScreen>
    )
}

export default privateRoute(Transactions)