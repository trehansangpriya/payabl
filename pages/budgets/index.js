import React, { useEffect, useState } from 'react'
import { NotFound, PageScreen } from '@/Components/app'
import useAuth from '@/Contexts/useAuth'
import dayjs from 'dayjs'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '@/Firebase/index'
import { BudgetCard, BudgetCardSkeleton } from '@/Components/pages/budgets'

const Budgets = () => {
    const { user } = useAuth()

    const currentMonth = dayjs().format('MM-YYYY')
    const [pastBudgets, setPastBudgets] = useState([])

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        onSnapshot(collection(db, 'users', user.uid, 'budgets'), (snapshot) => {
            setPastBudgets(snapshot.docs.filter(
                doc => doc.id !== currentMonth
            ).sort(
                // Sort by month, descending
                (a, b) => b.id.localeCompare(a.id)
            ).map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            )
        })
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [user.uid, currentMonth])
    return (
        <PageScreen
            title={'Budget History'}
            className={'px-4 py-5'}
        >
            {
                loading ?
                    <BudgetCardSkeleton />
                    : (
                        <div className={'flex flex-col gap-2'}>
                            {
                                pastBudgets.length > 0 ?
                                    pastBudgets.map(budget => (
                                        <BudgetCard key={budget.id} budget={budget} />
                                    )) : (
                                        <NotFound message={'No budget history found'} />
                                    )
                            }
                        </div>
                    )
            }
        </PageScreen>
    )
}

export default Budgets