import React, { useEffect, useState } from 'react'
import useAccountCalculations from '@/Hooks/useAccountCalculations'
import { FiDownload, FiUpload } from 'react-icons/fi'
import { Pill } from '@/Components/utility'

const Overview = ({
    transactions,
}) => {
    const { getTotalExpense, getTotalIncome, truncateAmount } = useAccountCalculations()
    const [totalIncome, setTotalIncome] = useState(0)
    const [totalExpense, setTotalExpense] = useState(0)
    useEffect(() => {
        setTotalIncome(truncateAmount(getTotalIncome(transactions)))
        setTotalExpense(truncateAmount(getTotalExpense(transactions)))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transactions])
    return (
        <div className='flex justify-around p-1 gap-2 font-medium' >
            <div className="flex gap-2 justify-center items-center text-success-600 border border-success-600 w-full p-2 bg-success-100 rounded-full">
                <FiDownload />
                <span className='text-lg'>
                    ₹{totalIncome}
                </span>
                {/* <span className='text-xs'>
                    Total Income
                </span> */}
            </div>
            <div className="flex gap-2 justify-center items-center text-error-600  border border-error-600 w-full p-2 bg-error-100 rounded-full">
                <FiUpload />
                <span className='text-lg'>
                    ₹{totalExpense}
                </span>
                {/* <span className='text-xs'>
                    Total Expense
                </span> */}
            </div>
        </div>
    )
}

export default Overview