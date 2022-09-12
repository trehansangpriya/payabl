import React, { useEffect, useState } from 'react'
import { Link, Spacer } from '@/Components/utility';
import { FiChevronRight } from 'react-icons/fi';
import NextLink from 'next/link'
import useAccountCalculations from '@/Hooks/useAccountCalculations';


const RecentTransactions = ({
    transactions,
    dataLoading,
}) => {
    // Recent Transactions
    const [recentTransactions, setRecentTransactions] = useState([])
    // Local Loading State
    const [loading, setLoading] = useState(true)

    const { truncateAmount } = useAccountCalculations()

    useEffect(() => {
        if (!dataLoading) {
            setRecentTransactions(transactions.sort((a, b) =>
                a.transactionDate.toDate() > b.transactionDate.toDate() ? -1 : 1
            ).slice(0, 5))
            setLoading(false)
        }
    }, [transactions, dataLoading])
    return (
        <div className={[
            'w-full rounded flex flex-col'
        ].join(' ')}>
            <div className="flex justify-between">
                <span className='font-medium text-sm'>
                    Recent Transactions
                </span>
                {
                    !dataLoading && !loading && (recentTransactions.length > 0) && (
                        <Link href={'/transactions'} iconRight={<FiChevronRight />} color='primary' className={'text-sm'} >
                            View All
                        </Link>
                    )
                }
            </div>
            <Spacer h={'2px'} />
            <div className="flex w-full mt-2 overflow-x-clip">
                <div className="flex gap-4 w-full overflow-x-scroll">
                    {
                        dataLoading || loading ?
                            <RecentTransactionSkeleton />
                            : (
                                recentTransactions.length > 0 ? (
                                    recentTransactions.map((transaction, index) => (
                                        <NextLink href={`/transactions/${transaction.id}`} key={index}>
                                            <div className={[
                                                'flex flex-col items-center cursor-pointer hover:brightness-95',
                                            ].join(' ')}>
                                                <div className={[
                                                    'rounded-full  flex justify-center items-center leading-none w-[56px] h-[56px]',
                                                    transaction.transactionType === 'Expense' ? 'text-error-600 bg-error-100' : 'text-success-600 bg-success-100',
                                                ].join(' ')}>
                                                    {transaction.transactionTitle.slice(0, 1).toUpperCase()}
                                                </div>
                                                <Spacer h={'4px'} />
                                                <div className={[
                                                    'text-sm text-layout-500',
                                                ].join(' ')}>
                                                    ₹{truncateAmount(transaction.transactionAmount)}
                                                </div>
                                            </div>
                                        </NextLink>
                                    ))) : (
                                    <NextLink href='/transactions/add'>
                                        <div className="text-blue-500 flex gap-1 items-center cursor-pointer hover:brightness-95">
                                            <span >
                                                Start tracking your money!
                                            </span>
                                            <FiChevronRight />
                                        </div>
                                    </NextLink>
                                ))
                    }
                </div>
            </div>
        </div>
    )
}

export default RecentTransactions

const RecentTransactionSkeleton = ({
    items = 5,
}) => {
    return Array(items).fill(0).map((_, index) => (
        <div key={index} className="flex gap-4 w-full overflow-x-scroll">
            <div className="flex flex-col items-center cursor-pointer hover:brightness-95 animate-pulse">
                <div className={[
                    'rounded-full  flex justify-center items-center leading-none w-[56px] h-[56px] bg-layout-200',
                ].join(' ')}>
                </div>
            </div>
        </div>
    ))
}