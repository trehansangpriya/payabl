import React, { useEffect, useState } from 'react'
import { AppScreen, FAB } from '@/Components/app'
import { Filters, Overview, ViewAllTransactions, DateFilter } from '@/Components/pages/transactions'
import useAuth from '@/Contexts/useAuth'
import { privateRoute } from '@/Routes/privateRoute'
import { collection, onSnapshot } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { db } from '@/Firebase/index';
import dayjs from 'dayjs'
import isBeetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBeetween)

const Transactions = () => {
    const { user } = useAuth()
    const router = useRouter()
    // All Transactions
    const [transactions, setTransactions] = useState([])
    // All Accounts
    const [accounts, setAccounts] = useState([])
    // All Categories
    const [categories, setCategories] = useState([])
    // Local Loading
    const [loading, setLoading] = useState(true)
    // filter
    const [filters, setFilters] = useState({
        transactionAccountID: '',
        transactionCategoryID: '',
        transactionType: '',
    })
    // console.log(filters)
    // Date Filter
    const [dateFilter, setDateFilter] = useState({
        startDate: dayjs().startOf('day'),
        endDate: dayjs().endOf('day'),
    })

    // Filtered Transactions
    const [filteredTransactions, setFilteredTransactions] = useState([])

    // Date Filtered Transactions
    const [dateFilteredTransactions, setDateFilteredTransactions] = useState([])

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
        }, 500)
    }, [user.uid])

    useEffect(() => {
        if (filters.transactionAccountID !== '' && filters.transactionCategoryID !== '' && filters.transactionType !== '') {
            setFilteredTransactions(transactions.filter(transaction => transaction.transactionAccountID === filters.transactionAccountID && transaction.transactionCategoryID === filters.transactionCategoryID && transaction.transactionType === filters.transactionType))
            return
        }
        else if (filters.transactionAccountID !== '') {
            setFilteredTransactions(transactions.filter(transaction => transaction.transactionAccountID === filters.transactionAccountID))
            return
        }
        else if (filters.transactionCategoryID !== '') {
            setFilteredTransactions(transactions.filter(transaction => transaction.transactionCategoryID === filters.transactionCategoryID))
            return
        }
        else if (filters.transactionType !== '') {
            setFilteredTransactions(transactions.filter(transaction => transaction.transactionType === filters.transactionType))
            return
        } else {
            setFilteredTransactions(transactions)
            return
        }
    }, [filters, transactions])

    useEffect(() => {
        setDateFilteredTransactions(filteredTransactions.filter(transaction => {
            if (dayjs(transaction.transactionDate.toDate()).isBetween(dayjs(dateFilter.startDate), dayjs(dateFilter.endDate), 'day', '[]')) {
                return transaction
            }
        }))
    }, [filteredTransactions, dateFilter])

    return (
        <AppScreen title={'Transactions'}>
            {
                !loading && transactions.length !== 0 && (
                    <div className="flex justify-between items-center px-1 gap-1">
                        {/* Date Filters */}

                        <DateFilter filter={dateFilter} setFilter={setDateFilter} />

                        {/* Filters */}

                        <Filters accounts={accounts} categories={categories} filters={filters} setFilters={setFilters} />
                    </div>
                )
            }


            {/* Filter Overview */}
            {
                !loading && transactions.length !== 0 && dateFilteredTransactions.length !== 0 && (
                    <Overview transactions={dateFilteredTransactions} />
                )
            }

            {/* Transaction List */}
            <ViewAllTransactions
                transactions={dateFilteredTransactions}
                accounts={accounts}
                categories={categories}
                loading={loading}
            />
            {/* FAB to add a new transaction */}
            <FAB
                label={'Add Transaction'}
                onClick={() => router.push('/transactions/add')}
            />
        </AppScreen>
    )
}

export default privateRoute(Transactions)