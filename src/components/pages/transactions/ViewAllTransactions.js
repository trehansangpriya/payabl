import React, { useState, useEffect } from 'react'
import useAuth from '@/Contexts/useAuth'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '@/Firebase/index'
import { Container, Seperator } from '@/Components/utility'
import TransactionCard, { TransactionSkeleton } from './TransactionCard'


const ViewAllTransactions = () => {
    // Local Loading
    const [loading, setLoading] = useState(false)

    // Auth Context
    const { user } = useAuth()

    // All Transactions
    const [transactions, setTransactions] = useState([])
    // All Accounts
    const [accounts, setAccounts] = useState([])
    // All Categories
    const [categories, setCategories] = useState([])

    // Get All Transactions
    useEffect(() => {
        setLoading(true)
        onSnapshot(collection(db, 'users', user.uid, 'transactions'), (snapshot) => {
            setTransactions(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })))
        })
        onSnapshot(collection(db, 'users', user.uid, 'accounts'), (snapshot) => {
            setAccounts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        })
        onSnapshot(collection(db, 'users', user.uid, 'categories'), (snapshot) => {
            setCategories(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        })
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [user.uid])

    return (
        <Container className={'flex flex-col gap-1'}>
            {loading ? <>
                <TransactionSkeleton />
            </> : (
                transactions.sort((a, b) =>
                    a.transactionDate.toDate() > b.transactionDate.toDate() ? -1 : 1
                ).map((transaction) => (
                    <div key={transaction.id}>
                        <TransactionCard
                            txn={transaction}
                            account={
                                accounts.find(account => account.id === transaction.transactionAccountID)
                            }
                            category={
                                categories.find(category => category.id === transaction.transactionCategoryID)
                            }
                        />
                        <Seperator />
                    </div>
                ))
            )
            }
        </Container>
    )
}

export default ViewAllTransactions