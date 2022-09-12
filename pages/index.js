import React, { useEffect, useState } from 'react'
import { privateRoute } from '@/Routes/privateRoute'
import { AppScreen, FAB } from '@/Components/app'
import { AccountsGlance, CurrentMonthBudget, RecentTransactions } from '@/Components/pages/home'
import useAuth from '@/Contexts/useAuth'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '@/Firebase/index';
import { useRouter } from 'next/router'
import { FiChevronRight } from 'react-icons/fi'
import { Link } from '@/Components/utility'

const Home = () => {
  const { user } = useAuth()
  const router = useRouter()
  // All Transactions
  const [transactions, setTransactions] = useState([])
  // All Accounts
  const [accounts, setAccounts] = useState([])
  // All Categories
  const [categories, setCategories] = useState([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    onSnapshot(collection(db, 'users', user.uid, 'transactions'), (snapshot) => {
      setTransactions(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })))
    })
    onSnapshot(collection(db, 'users', user.uid, 'accounts'), (snapshot) => {
      setAccounts(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })))
    })
    onSnapshot(collection(db, 'users', user.uid, 'categories'), (snapshot) => {
      setCategories(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })))
    })
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [user.uid])
  return (
    <AppScreen title={'Dashboard'}>
      <div className='w-full flex flex-col gap-5 p-1 select-none'>
        {/* Budget Manager */}
        <CurrentMonthBudget transactions={transactions} dataLoading={loading} />
        {/* Accounts at a Glance */}
        <AccountsGlance accounts={accounts} dataLoading={loading} />
        {/* Recent Transactions */}
        <RecentTransactions transactions={transactions} dataLoading={loading} />
        {/* My Categories */}
        {
          !loading && (
            <>
              <div className="flex justify-start">
                <Link href={'/profile/categories'} iconRight={<FiChevronRight />} className={'text-sm hover:text-primary-600'} >
                  Manage my categories
                </Link>
              </div>
              <div className="flex justify-start">
                <Link href={'/budgets'} iconRight={<FiChevronRight />} className={'text-sm hover:text-primary-600'} >
                  See Budget History
                </Link>
              </div>
            </>
          )
        }
      </div>
      <FAB
        onClick={() => router.push('/transactions/add')}
      />
    </AppScreen>
  )
}

export default privateRoute(Home)