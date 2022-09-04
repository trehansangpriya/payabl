import React, { useEffect, useState } from 'react'
import useAccountCalculations from '@/Hooks/useAccountCalculations'
import { FiDownload, FiUpload } from 'react-icons/fi'
import { Seperator } from '@/Components/utility'

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
        <>
            <Seperator />
            <div className='flex justify-around items-center p-1 gap-2 font-medium' >
                <div className="flex flex-col gap-1 justify-center items-center text-success-600 w-full p-2">
                    <FiDownload />
                    <span className='text-lg'>
                        ₹{totalIncome}
                    </span>
                    {/* <span className='text-xs'>
                        Income
                    </span> */}
                </div>
                <div className='text-layout-300'>
                    |
                </div>
                <div className="flex flex-col gap-1 justify-center items-center text-error-600 w-full p-2">
                    <FiUpload />
                    <span className='text-lg'>
                        ₹{totalExpense}
                    </span>
                    {/* <span className='text-xs'>
                        Expense
                    </span> */}
                </div>
            </div>
            <Seperator />
        </>
    )
}

export default Overview