import React, { useEffect, useState } from 'react'
import { Card, Container, Pill, Text } from '@/Components/utility'
import Image from 'next/image'
import useAccountCalculations from '@/Hooks/useAccountCalculations'
import dummyTransactions from '@/Data/dummyTransactions'
const AccountCard = ({
    account,
}) => {
    const { id, accountName, accountDescription, accountType, accountOpeningBalance, accountCreditLimit } = account

    const pillColors = {
        'Bank': 'primary',
        'Physical Wallet': 'success',
        'Digital Wallet': 'warn',
        'Credit Card': 'error',
    }

    // useAccountCalculations Hook
    const { accountBalance, truncateAmount } = useAccountCalculations()

    const txns = dummyTransactions.filter(txn => txn.txnAccount === id)
    const balance = accountBalance(
        txns,
        accountType === 'Credit Card' ? accountCreditLimit : accountOpeningBalance
    )

    return (
        <Card pointer className={[
            'justify-start items-center',
            'border-2 border-layout-200'
        ].join(' ')} >
            <div className={'flex w-full gap-2 items-center justify-between'} >
                <div className="flex flex-col gap-1">
                    <h5 className='font-bold text-lg'>
                        {accountName}
                    </h5>
                    <Pill
                        size='14px'
                        color={pillColors[accountType]}
                        icon={
                            <Image
                                src={`/assets/icons/accountTypes/${accountType.replace(/\s/g, '').toLowerCase()}.png`}
                                width={16}
                                height={16}
                                alt={accountType}
                            />
                        }  >
                        {accountType}
                    </Pill>
                </div>
                <div className="flex flex-col items-end">
                    <small className={'text-xs'} >
                        {accountType === 'Credit Card' ? 'Limit Remaining' : 'Current Balance'}
                    </small>
                    <p className='text-xl font-bold'>
                        ₹{truncateAmount(balance)}
                    </p>
                </div>
            </div>
        </Card>
    )
}

export default AccountCard





export const AccountSkeleton = ({
    items = 3,
}) => {
    // render items times

    return [...Array(items)].map((e, i) => (
        <Card key={i} className={'justify-start items-center animate-pulse'} >
            <div className={'flex w-full gap-2 items-center justify-between'} >
                <div className="flex flex-col gap-1">
                    <h5 className='h-6 w-20 rounded-full bg-layout-300'></h5>
                    <Pill size='14px' className={'h-4 w-11'}></Pill>
                </div>
                <div className="flex flex-col gap-1 items-end">
                    <small className={'h-3 w-11 bg-layout-200 rounded-full'} ></small>
                    <p className='h-5 w-16 bg-layout-300 rounded-full'></p>
                </div>
            </div>
        </Card>
    ))
}