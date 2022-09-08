import React, { useEffect, useState } from 'react'
import { ViewAllTransactions } from '../transactions';
import { Link, Spacer } from '@/Components/utility';
import { FiChevronRight } from 'react-icons/fi';

const RecentTransactions = ({
    transactions,
    accounts,
    categories,
    dataLoading,
}) => {
    // Recent Transactions
    const [recentTransactions, setRecentTransactions] = useState([])
    // Local Loading State
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!dataLoading) {
            setRecentTransactions(transactions.slice(0, 3))
            setLoading(false)
        }
    }, [transactions, dataLoading])
    return (
        <div className={[
            'w-full flex flex-col'
        ].join(' ')}>
            <span className='font-medium text-sm'>
                Recent Transactions
            </span>
            <Spacer h={'2px'} />
            <ViewAllTransactions
                transactions={recentTransactions}
                accounts={accounts}
                categories={categories}
                loading={loading}
            />
            <Spacer h={'4px'} />
            {
                !dataLoading && !loading && (
                    <Link href={'/transactions'} iconRight={<FiChevronRight />} color='primary' className={'text-sm'} >
                        See All Transactions
                    </Link>
                )
            }
        </div>
    )
}

export default RecentTransactions