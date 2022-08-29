import React, { useEffect, useState } from 'react'
import { Card, Pill, Seperator } from '@/Components/utility'
import Image from 'next/image'
import useAccountCalculations from '@/Hooks/useAccountCalculations'
import Link from 'next/link'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '@/Firebase/index';
import useAuth from '@/Contexts/useAuth'
const AccountCard = ({
    account,
}) => {
    const { user } = useAuth()

    const { id, accountName, accountDescription, accountType, accountOpeningBalance, accountCreditLimit } = account

    const pillColors = {
        'Bank': 'primary',
        'Physical Wallet': 'success',
        'Digital Wallet': 'warn',
        'Credit Card': 'info',
    }

    const [txns, setTxns] = useState([])
    const [balance, setBalance] = useState('')

    // useAccountCalculations Hook
    const { truncateAmount, accountBalance } = useAccountCalculations()

    useEffect(() => {
        onSnapshot(collection(db, 'users', user.uid, 'transactions'), (snapshot) => {
            setTxns(snapshot.docs.filter(
                (doc) => doc.data().transactionAccountID === id
            ).map(doc => ({
                txnAmount: doc.data().transactionAmount,
                txnType: doc.data().transactionType,
            })))
        })
    }, [user.uid, id])

    useEffect(() => {
        setBalance(accountBalance(txns, accountType === 'Credit Card' ? accountCreditLimit : accountOpeningBalance))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [txns])

    return (
        <Link href={`/accounts/${id}`}>
            <a>
                <Card
                    pointer
                    rounded
                    hover
                    className={[
                        'justify-start items-center',
                        // 'border-2 border-layout-200'
                    ].join(' ')} >
                    <div className={'flex w-full gap-2 items-center justify-between'} >
                        <div className="flex flex-col gap-1">
                            <h5 className='font-semibold'>
                                {accountName}
                            </h5>
                            <Pill
                                size='10px'
                                color={pillColors[accountType]}
                                icon={
                                    <Image
                                        src={`/assets/icons/accountTypes/${accountType.replace(/\s/g, '').toLowerCase()}.png`}
                                        width={10}
                                        height={10}
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
                            <p className='text-lg font-semibold'>
                                {truncateAmount(balance)}
                            </p>
                        </div>
                    </div>
                </Card>
            </a>
        </Link>
    )
}

export default AccountCard





export const AccountSkeleton = ({
    items = 3,
}) => {
    // render items times

    return [...Array(items)].map((e, i) => (
        <div key={i}>
            <Card className={'justify-start items-center animate-pulse shadow-none'} >
                <div className={'flex w-full gap-2 items-center justify-between'} >
                    <div className="flex flex-col gap-1">
                        <h5 className='h-5 w-20 rounded-full bg-layout-300'></h5>
                        <Pill size='14px' className={'h-4 w-[70px]'}></Pill>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                        <small className={'h-2 w-11 bg-layout-200 rounded-full'} ></small>
                        <p className='h-4 w-16 bg-layout-300 rounded-full'></p>
                    </div>
                </div>
            </Card>
            <Seperator className='mt-1' />
        </div>
    ))
}