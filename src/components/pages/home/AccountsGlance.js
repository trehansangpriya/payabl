import React, { useEffect, useState } from 'react'
import useAccountCalculations from '@/Hooks/useAccountCalculations'
import Image from 'next/image'
import Link from 'next/link'


const AccountsGlance = ({
    accounts,
    transactions,
    dataLoading,
}) => {
    return (
        <div className={[
            'w-full rounded flex flex-col'
        ].join(' ')}>
            <span className='font-medium text-sm'>
                My Accounts
            </span>
            {/* <ViewAllAccounts/> */}
            <div className="flex w-full mt-2 overflow-x-clip">
                <div className="flex gap-1 w-full overflow-x-scroll">
                    {
                        dataLoading ? (
                            <AccountGlanceCardSkeleton />
                        ) : (
                            accounts.map(account => (
                                <AccountGlanceCard
                                    key={account.id}
                                    account={account}
                                    transactions={transactions?.filter(txn => txn.transactionAccountID === account.id)}
                                />
                            ))
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default AccountsGlance

const AccountGlanceCard = ({
    account,
    transactions,
}) => {
    const { id, accountName, accountDescription, accountType, accountOpeningBalance, accountCreditLimit } = account
    const { accountBalance, truncateAmount } = useAccountCalculations()
    const [balance, setBalance] = useState(0)

    useEffect(() => {
        const txns = transactions?.map(txn => ({
            txnAmount: txn.transactionAmount,
            txnType: txn.transactionType,
        }))
        setBalance(truncateAmount(accountBalance(txns, accountType === 'Credit Card' ? accountCreditLimit : accountOpeningBalance)))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transactions])
    return (
        <Link href={`/accounts/${id}`}>
            <div className='min-w-[100px] w-fit flex flex-col p-2 rounded border justify-end gap-1 transition-all cursor-pointer bg-layout-100 hover:brightness-95 active:scale-95'>
                <Image
                    src={`/assets/icons/accountTypes/${accountType.replace(/\s/g, '').toLowerCase()}.png`}
                    width={24}
                    height={24}
                    alt={accountType}
                    layout='fixed'
                />
                <span className=' whitespace-nowrap text-ellipsis overflow-hidden leading-4'>
                    {accountName}
                </span>
                <span className='font-semibold text-lg leading-6'>
                    ₹{balance}
                </span>
            </div>
        </Link>
    )
}

const AccountGlanceCardSkeleton = ({
    items = 3,
}) => {
    return [...Array(items)].map((e, i) => (
        <div key={i} className='min-w-[100px] w-fit flex gap-1 flex-col p-2 rounded border animate-pulse'>
            <div className="w-6 h-6 bg-layout-200 rounded-full"></div>
            <span className='w-12 h-5 bg-layout-200 rounded-full'>
            </span>
            <span className='font-semibold text-lg h-6 w-16 bg-layout-200 rounded-full'>
            </span>
        </div>
    ))
}