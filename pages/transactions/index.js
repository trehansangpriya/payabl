import { AppScreen, FAB } from '@/Components/app'
import { ViewAllTransactions } from '@/Components/pages/transactions'
import { Text } from '@/Components/utility'
import { privateRoute } from '@/Routes/privateRoute'
import { useRouter } from 'next/router'
import React from 'react'

const Transactions = () => {
    const router = useRouter()
    return (
        <AppScreen title={'Transactions'}>
            <ViewAllTransactions />
            {/* FAB to add a new transaction */}
            <FAB
                label={'Add Transaction'}
                onClick={() => router.push('/transactions/add')}
            />
        </AppScreen>
    )
}

export default privateRoute(Transactions)