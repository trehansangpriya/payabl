import React, { useEffect, useState } from 'react'
import { PageScreen } from '@/Components/app'
import useAuth from '@/Contexts/useAuth'
import { useRouter } from 'next/router'
import { collection, doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/Firebase/index';
import { ViewTransaction, ViewTransactionSkeleton } from '@/Components/pages/transactions'
import { Link, Spacer } from '@/Components/utility'
import { privateRoute } from '@/Routes/privateRoute'

const Transaction = () => {
    const { user } = useAuth()
    const router = useRouter()
    const { transactionID } = router.query

    const [loading, setLoading] = useState(false)

    const [transactionData, setTransactionData] = useState({})
    const [accounts, setAccounts] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        setLoading(true)
        onSnapshot(doc(db, 'users', user.uid, 'transactions', transactionID), (doc) => {
            if (doc.exists()) {
                setTransactionData({
                    id: doc.id,
                    ...doc.data()
                })
            }
        })
        onSnapshot(collection(db, 'users', user.uid, 'accounts'), (snapshot) => {
            setAccounts(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })
            ))
        })
        onSnapshot(collection(db, 'users', user.uid, 'categories'), (snapshot) => {
            setCategories(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })
            ))
        })
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [transactionID, user.uid])
    return (
        <PageScreen
            title={`Transaction`}
            className={'px-4 py-5'}
        >
            {
                loading ? (
                    <ViewTransactionSkeleton />
                ) : (transactionData.id ? (
                    <ViewTransaction txn={transactionData} accounts={accounts} categories={categories} />
                ) : (
                    <div className={'w-full h-full flex flex-col justify-center items-center text-center text-layout-500'}>
                        <h1 className={'text-lg font-medium'}>Transaction #{transactionID} does not exist</h1>
                        <Spacer h={'18px'} />
                        <Link
                            href={'/transactions'}
                            color='primary'
                        >
                            Go Back
                        </Link>
                    </div>
                ))
            }

        </PageScreen>
    )
}

export default privateRoute(Transaction)