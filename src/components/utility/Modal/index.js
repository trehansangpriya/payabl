import React, { useRef, useEffect } from 'react'
import { FiXCircle } from 'react-icons/fi'

const Modal = ({
    children,
    isOpen = false,
    onClose,
    title,
    className,
}) => {
    const modal = useRef(null)
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modal.current && !modal.current.contains(e.target)) {
                onClose()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen])

    if (!isOpen) {
        return null
    }
    return (
        <div className='w-full h-screen fixed top-0 right-0 bg-black bg-opacity-40 flex  items-center justify-center z-50'>
            <div className="bg-layout-100 p-4 rounded shadow min-w-[320px] max-w-[90%] lg:max-w-[40%] flex flex-col gap-4 items-center justify-center w-fit" ref={modal}>
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