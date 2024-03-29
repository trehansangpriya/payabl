import { PageScreen } from '@/Components/app'
import { AccountAddForm, AccountForm } from '@/Components/pages/accounts'
import { privateRoute } from '@/Routes/privateRoute'
import { useRouter } from 'next/router'
import React from 'react'

const AddAccount = () => {
    const router = useRouter()
    return (
        <PageScreen
            title={'Add New Account'}
            className={'items-center pt-4'}
        >
            {/* <AccountForm
                afterSubmitActions={() => router.push('/accounts')}
            /> */}
            <AccountAddForm afterSubmitActions={() => router.push('/accounts')} />
        </PageScreen>
    )
}

export default privateRoute(AddAccount)