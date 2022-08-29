import { Card, Pill, Seperator } from '@/Components/utility'
import useAccountCalculations from '@/Hooks/useAccountCalculations'
import dayjs from 'dayjs'
import Image from 'next/image'
import React from 'react'

const TransactionCard = ({ txn = {}, account = {}, category = {} }) => {
    const { id, transactionTitle, transactionAmount, transactionDate, transactionType, transactionAccountID, transactionCategoryID, transactionNote } = txn

    const { accountName, accountDescription, accountType, accountOpeningBalance, accountCreditLimit, balance, creditLeft } = account

    const { name, emoji } = category

    const pillColors = {
        'Income': 'success',
        'Expense': 'error',
    }
    const accountPillColors = {
        'Bank': 'primary',
        'Physical Wallet': 'success',
        'Digital Wallet': 'warn',
        'Credit Card': 'info',
    }

    // useCalculations Hook
    const { truncateAmount } = useAccountCalculations()
    return (
        <Card
            pointer
            rounded
            hover
            className={[
                'justify-start items-center',
            ].join(' ')} >
            <div className={'flex w-full gap-2 items-center justify-between'} >
                <div className="flex flex-col gap-1">
                    <h5 className='font-semibold'>
                        {transactionTitle}
                    </h5>

                    <div className="flex gap-1">
                        <Pill
                            size='10px'
                            icon={<span>{emoji}</span>}
                        >
                            {name}
                        </Pill>
                        <Pill
                            size='10px'
                            color={accountPillColors[accountType]}
                            icon={
                                <Image
                                    src={`/assets/icons/accountTypes/${accountType?.replace(/\s/g, '').toLowerCase()}.png`}
                                    width={10}
                                    height={10}
                                    alt={accountType}
                                />
                            }
                        >
                            {accountName} / {dayjs(transactionDate.toDate()).format('MMM D, YYYY')}
                        </Pill>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <p
                        className={[`text-lg font-semibold`,
                            transactionType === 'Income' ? 'text-success-600' : 'text-error-600'
                        ].join(' ')}>
                        ₹{truncateAmount(transactionAmount)}
                    </p>
                </div>
            </div>
        </Card>
    )
}

export default TransactionCard

export const TransactionSkeleton = ({
    items = 4
}) => {
    // render items
    return [...Array(items)].map((_, index) => (
        <div key={index}>
            <Card className={'justify-start items-center animate-pulse'}>
                <div className={'flex w-full gap-2 items-center justify-between'} >
                    <div className="flex flex-col gap-1">
                        <h5 className='h-5 w-20 rounded-full bg-layout-300'></h5>

                        <div className="flex gap-1">
                            <Pill
                                size='10px'
                                className={'h-3 w-[50px]'}
                            ></Pill>
                            <Pill
                                size='10px'
                                className={'h-3 w-[40px]'}
                            >                            </Pill>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <p
                            className={'h-4 w-16 bg-layout-300 rounded-full'}>
                        </p>
                    </div>
                </div>
            </Card>
            <Seperator />
        </div>
    ))
}