import { PageScreen } from '@/Components/app'
import { TransactionForm } from '@/Components/pages/transactions'
import { useRouter } from 'next/router'
import React from 'react'

const AddTransaction = () => {
    const router = useRouter()
    return (
        <PageScreen
            title={'Add Transaction'}
            className={'items-center pt-4'}
        >
            <TransactionForm
                task={'add'}
                afterSubmitActions={() => router.push('/transactions')}
            />
        </PageScreen>
    )
}

export default AddTransaction