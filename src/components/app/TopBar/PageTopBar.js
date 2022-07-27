import { useRouter } from 'next/router'
import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'

const PageTopBar = ({
    label
}) => {
    const router = useRouter()
    // Go back to previous page
    const goBack = () => {
        router.back()
    }
    return (
        <div
            className='flex justify-between items-center w-full p-2 z-10 bg-layout-100 max-h-[60px] border-b-[1px] border-layout-200'
        >
            <div className='flex flex-1 justify-start items-center gap-2'>
                <span
                    className={[
                        'p-2 cursor-pointer rounded-full bg-layout-100 hover:bg-layout-200',
                        'active:scale-[.98] hover:scale-[1.02]',
                    ].join(' ')}
                    onClick={goBack}
                >
                    <FiArrowLeft size={22} />
                </span>
                <span
                    className='font-semibold text-xl'
                >
                    {label}
                </span>
            </div>
        </div>
    )
}

export default PageTopBar