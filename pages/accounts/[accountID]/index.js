import { PageScreen } from '@/Components/app'
import { collection, doc, onSnapshot } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { db } from '@/Firebase/index';
import useAuth from '@/Contexts/useAuth';
import { Pill, Seperator, Spacer } from '@/Components/utility';
import Image from 'next/image';
import { accountPillColors } from '@/Data/accountTypes';
import useAccountCalculations from '@/Hooks/useAccountCalculations';
import { TransactionCard } from '@/Components/pages/transactions';

const ViewAccout = () => {
    const { user } = useAuth()
    const router = useRouter()
    const { accountID } = router.query

    const [loading, setLoading] = useState(true)

    const [accountData, setAccountData] = useState({})
    const [transactions, setTransactions] = useState([])
    const [categories, setCategories] = useState([])

    const [balance, setBalance] = useState(0)

    const { accountBalance } = useAccountCalculations()

    useEffect(() => {
        onSnapshot(doc(db, 'users', user.uid, 'accounts', accountID), (doc) => {
            setAccountData(doc.data())
        })
        onSnapshot(collection(db, 'users', user.uid, 'categories'), (snapshot) => {
            setCategories(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })
            ))
        })
        onSnapshot(collection(db, 'users', user.uid, 'transactions'), (snapshot) => {
            const transactions = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            const filteredTransactions = transactions.filter((transaction) => transaction.transactionAccountID === accountID)
            setTransactions(filteredTransactions)
        })
        setLoading(false)
    }, [accountID, user.uid])

    useEffect(() => {
        const txns = transactions.map((transaction) => ({
            txnType: transaction.transactionType,
            txnAmount: transaction.transactionAmount,
        }))
        setBalance(accountBalance(txns, accountData.accountType === 'Credit Card' ? accountData.accountCreditLimit : accountData.accountOpeningBalance))
    }, [transactions])
    return (
        <PageScreen
            title={`Account - ${accountData?.accountName}`}
            className={'px-4 py-5'}
        >
            {
                loading ? <div className={'text-center'}>Loading...</div> :
                    (
                        <div className={'flex flex-col gap-2'}>
                            <div className={'flex items-center gap-2'}>
                                <h1 className={'font-semibold text-2xl'}>{accountData.accountName}</h1>
                                <Pill
                                    size='18px'
                                    color={accountPillColors[accountData?.accountType]}
                                    icon={
                                        <Image
                                            src={`/assets/icons/accountTypes/${accountData?.accountType?.replace(/\s/g, '').toLowerCase()}.png`}
                                            width={20}
                                            height={20}
                                            alt={accountData.accountType}
                                        />
                                    }
                                >{accountData.accountType}</Pill>
                            </div>
                            <div className='text-sm text-layout-500'>
                                {accountData.accountDescription}
                            </div>
                            <h2 className='flex flex-col'>
                                {
                                    accountData.accountType === 'Credit Card'
                                        ? <span>Credit Left</span>
                                        : <span>Balance</span>
                                }
                                <span className='text-3xl font-semibold'>
                                    ₹{balance}
                                </span>
                            </h2>
                            <Spacer h={'8px'} />
                            {
                                transactions.length > 0
                                    ? (
                                        <div className="flex flex-col gap-1 w-full">
                                            <Seperator text={'Transactions'} />
                                            {
                                                transactions.sort((a, b) =>
                                                    a.transactionDate.toDate() > b.transactionDate.toDate() ? -1 : 1
                                                ).map((transaction) => (
                                                    <div
                                                        key={transaction.id}
                                                    >
                                                        <TransactionCard
                                                            txn={transaction}
                                                            account={accountData}
                                                            category={categories.find((category) => category.id === transaction.transactionCategoryID)}
                                                        />
                                                        <Seperator className='mt-1' />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                    : <div className={'text-center'}>No Transactions</div>
                            }
                        </div>
                    )
            }

        </PageScreen>
    )
}

export default ViewAccout