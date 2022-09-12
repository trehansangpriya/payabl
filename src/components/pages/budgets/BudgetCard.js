import React, { useEffect, useState } from 'react'
import { Pill } from '@/Components/utility'
import useAuth from '@/Contexts/useAuth'
import { db } from '@/Firebase/index'
import useAccountCalculations from '@/Hooks/useAccountCalculations'
import dayjs from 'dayjs'
import { collection, onSnapshot } from 'firebase/firestore'

const BudgetCard = ({
    budget,
}) => {
    const { user } = useAuth()
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)

    const [spent, setSpent] = useState(0)
    const [remaining, setRemaining] = useState(0)
    const [percentageRemaining, setPercentageRemaining] = useState(0)
    const [percentageSpent, setPercentageSpent] = useState(0)

    const { truncateAmount } = useAccountCalculations()

    useEffect(() => {
        setLoading(true)
        onSnapshot(collection(db, 'users', user.uid, 'transactions'), (snapshot) => {
            setTransactions(snapshot.docs.filter(doc =>
                dayjs(doc.data().transactionDate.toDate()).format('MM-YYYY') === budget.id
            ).map(doc => ({
                id: doc.id,
                ...doc.data()
            })))
        })
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [user.uid, budget.id])

    useEffect(() => {
        setLoading(true)
        setSpent(transactions.reduce((acc, transaction) => {
            if (transaction.transactionType === 'Expense') {
                return acc + transaction.transactionAmount
            }
            return acc
        }, 0))
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [transactions])

    useEffect(() => {
        setLoading(true)
        if (budget) {
            setRemaining(budget.amount - spent)
            setPercentageSpent((spent / budget.amount) * 100)
            setPercentageRemaining(((budget.amount - spent) / budget.amount) * 100)
        }
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [budget, spent])
    return !loading ? (
        <div className='flex justify-between border rounded p-2 items-center'>
            <div className="flex gap-3 items-center">
                <div className='flex flex-col gap-1'>
                    <span className='text-sm'>
                        {
                            dayjs(
                                budget.id.split('-')[0] + '-01-' + budget.id.split('-')[1]
                                , 'DD-MM-YYYY').format('MMMM YYYY')
                        }
                    </span>
                    <span className='text-lg font-semibold'>
                        ₹{truncateAmount(budget.amount)}
                    </span>
                </div>
            </div>
            <div>
                <Pill
                    color={
                        percentageRemaining < 0 ? 'error' : 'success'
                    }
                    size='12px'
                >
                    {
                        percentageSpent < 100 ? `₹${truncateAmount(remaining)} Saved` : `₹${truncateAmount(remaining * -1)} Over Budget`
                    }
                </Pill>
            </div>
        </div>
    ) : (
        <BudgetCardSkeleton items={1} />
    )
}

export default BudgetCard

export const BudgetCardSkeleton = ({
    items = 3,
}) => {
    return Array(items).fill(0).map((_, index) => (
        <div key={index} className='flex justify-between border rounded p-2 items-center animate-pulse'>
            <div className="flex gap-3 items-center">
                <div className='flex flex-col gap-1'>
                    <div className='h-5 w-11 bg-layout-200 rounded-full'>
                    </div>
                    <span className='h-6 w-20 bg-layout-200 rounded-full'>

                    </span>
                </div>
            </div>
            <div>
                <div
                    className='h-4 w-20 bg-layout-200 rounded-full'
                ></div>
            </div>
        </div>

    ))
}