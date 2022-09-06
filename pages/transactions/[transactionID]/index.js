import React, { useEffect, useState } from 'react'
import { PageScreen } from '@/Components/app'
import useAuth from '@/Contexts/useAuth'
import { useRouter } from 'next/router'
import { collection, doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/Firebase/index';
import { ViewTransaction, ViewTransactionSkeleton } from '@/Components/pages/transactions'

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
            setTransactionData({
                id: doc.id,
                ...doc.data()
            })
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
                ) : (
                    <ViewTransaction txn={transactionData} accounts={accounts} categories={categories} />
                )
            }

        </PageScreen>
    )
}

export default Transaction