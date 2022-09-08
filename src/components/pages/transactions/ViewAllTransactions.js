import React from 'react'
import { Container, Seperator } from '@/Components/utility'
import TransactionCard, { TransactionSkeleton } from './TransactionCard'


const ViewAllTransactions = ({ transactions, accounts, categories, loading }) => {
    return (
        <Container className={'flex flex-col gap-1'}>
            {
                loading
                    ? <TransactionSkeleton /> : (
                        transactions.length !== 0 ? transactions.sort((a, b) =>
                            a.transactionDate.toDate() > b.transactionDate.toDate() ? -1 : 1
                        ).map((transaction, index) => (
                            <div key={transaction.id}>
                                <TransactionCard
                                    txn={transaction}
                                    account={
                                        accounts.find(account => account.id === transaction.transactionAccountID)
                                    }
                                    category={
                                        categories.find(category => category.id === transaction.transactionCategoryID)
                                    }
                                />
                                {
                                    index !== transactions.length - 1 && <Seperator className='mt-1' />
                                }
                            </div>
                        ))
                            :
                            <div className='text-center text-layout-500 p-3'>
                                No transactions found
                            </div>
                    )
            }
        </Container>
    )
}

export default ViewAllTransactions