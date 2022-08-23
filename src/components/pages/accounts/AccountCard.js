import React from 'react'
import { Card, Pill, Seperator } from '@/Components/utility'
import Image from 'next/image'
import useAccountCalculations from '@/Hooks/useAccountCalculations'
import Link from 'next/link'
const AccountCard = ({
    account,
}) => {
    const { id, accountName, accountDescription, accountType, accountOpeningBalance, accountCreditLimit, balance, creditLeft } = account

    const pillColors = {
        'Bank': 'primary',
        'Physical Wallet': 'success',
        'Digital Wallet': 'warn',
        'Credit Card': 'info',
    }

    // useAccountCalculations Hook
    const { truncateAmount } = useAccountCalculations()

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
                                {accountType === 'Credit Card' ? <> ₹{truncateAmount(creditLeft)} </> : <>  ₹{truncateAmount(balance)} </>}

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
            <Seperator />
        </div>
    ))
}