import React from 'react'
import { AppScreen, FAB } from '@/Components/app'
import { ViewAllAccounts } from '@/Components/pages/accounts'
import { privateRoute } from '@/Routes/privateRoute'
import { useRouter } from 'next/router'

const Accounts = () => {
    const router = useRouter()
    return (
        <AppScreen title={'Accounts'}>
            {/* All Accounts added by the user */}
            <ViewAllAccounts />
            {/* ------------------------------------------------------------- */}
            {/* FAB to add a new account */}
            <FAB
                label={'Add Account'}
                // onClick={() => setAddAccountModal(true)}
                onClick={() => router.push('/accounts/add')}
            />
        </AppScreen>
    )
}

export default privateRoute(Accounts)