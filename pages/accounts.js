import { AppScreen } from '@/Components/app'
import { privateRoute } from '@/Routes/privateRoute'
import React from 'react'

const Accounts = () => {
    return (
        <AppScreen>Accounts</AppScreen>
    )
}

export default privateRoute(Accounts)