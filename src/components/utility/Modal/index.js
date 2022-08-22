import React from 'react'
import { Button, Seperator } from '@/Components/utility/'
import { FiXCircle } from 'react-icons/fi'

const Modal = ({
    children,
    isOpen = false,
    onClose,
    title,
    className,
}) => {
    if (!isOpen) {
        return null
    }
    return (
        <div className='w-full h-screen fixed top-0 right-0 bg-black bg-opacity-40 flex  items-center justify-center z-50'>
            <div className="bg-layout-100 p-4 rounded shadow min-w-[320px] max-w-[90%] lg:max-w-[40%] flex flex-col gap-4 items-center justify-center w-fit">
                {title && (
                    <>
                        <div className='w-full flex justify-between items-center gap-2'>
                            <h1 className='text-lg font-medium'>{title}</h1>
                            <FiXCircle className='text-2xl cursor-pointer text-error-500' onClick={onClose} />
                        </div>
                    </>
                )}
                <div className={`w-full flex justify-center items-center ${className}`}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal