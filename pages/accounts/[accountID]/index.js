import React, { useEffect, useState } from 'react'
import { PageScreen } from '@/Components/app'
import { collection, doc, onSnapshot } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { db } from '@/Firebase/index';
import useAuth from '@/Contexts/useAuth';
import useAccountCalculations from '@/Hooks/useAccountCalculations';
import { ViewAccount, ViewAccountSkeleton } from '@/Components/pages/accounts';
import { Link, Spacer } from '@/Components/utility';
import { privateRoute } from '@/Routes/privateRoute';

const Account = () => {
    const { user } = useAuth()
    const router = useRouter()
    const { accountID } = router.query

    const [loading, setLoading] = useState(false)

    const [accountData, setAccountData] = useState({})
    const [transactions, setTransactions] = useState([])
    const [categories, setCategories] = useState([])

    const [balance, setBalance] = useState(0)

    const { accountBalance } = useAccountCalculations()



    useEffect(() => {
        setLoading(true)
        onSnapshot(doc(db, 'users', user.uid, 'accounts', accountID), (doc) => {
            if (doc.exists()) {
                setAccountData({
                    id: doc.id,
                    ...doc.data()
                })
            }
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
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [accountID, user.uid])

    useEffect(() => {
        const txns = transactions.map((transaction) => ({
            txnType: transaction.transactionType,
            txnAmount: transaction.transactionAmount,
        }))
        setBalance(accountBalance(txns, accountData.accountType === 'Credit Card' ? accountData.accountCreditLimit : accountData.accountOpeningBalance))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transactions])
    return (
        <PageScreen
            title={`Account`}
            className={'px-4 py-5'}
        >
            {
                loading ? <ViewAccountSkeleton /> :
                    ((accountData.id ? (

                        <ViewAccount
                            accountData={accountData}
                            balance={balance}
                            transactions={transactions}
                            categories={categories}
                        />
                    ) : (
                        <div className={'w-full h-full flex flex-col justify-center items-center text-center text-layout-500'}>
                            <h1 className={'text-lg font-medium'}>Account #{accountID} does not exist</h1>
                            <Spacer h={'18px'} />
                            <Link
                                href={'/accounts'}
                                color='primary'
                            >
                                Go Back
                            </Link>
                        </div>
                    )
                    ))
            }

        </PageScreen>
    )
}

export default privateRoute(Account)