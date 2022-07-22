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
            <div className="bg-white p-4 rounded shadow min-w-[320px] max-w-[80%] lg:max-w-[40%] flex flex-col gap-2 items-center justify-center">
                {title && (
                    <>
                        <div className='w-full flex justify-start items-center'>
                            <h1 className='text-lg font-medium'>{title}</h1>
                        </div>
                        <Seperator />
                    </>
                )}
                <div className={`w-full flex justify-center items-center ${className}`}>
                    {children}
                </div>
                <Seperator />
                <div className='w-full flex justify-start items-center'>
                    <Button
                        color='error'
                        iconLeft={<FiXCircle />}
                        onClick={onClose}
                    >Close</Button>
                </div>
            </div>
        </div>
    )
}

export default Modal