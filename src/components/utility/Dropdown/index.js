import React, { useState } from 'react'
import { FiCheck } from 'react-icons/fi'

const Dropdown = ({
    className = '',
    children

}) => {
    return (
        // Dropdown container
        <div className={[
            'relative',
            className,
        ].join(' ')}>
            {children}
        </div>
    )
}

export default Dropdown

export const DropdownTrigger = ({
    containerClassName = '',
    className,
    children = null,
    onClick = () => { },
    icon = null,
    iconPosition = 'left',
    size = 'text-sm',
}) => {
    return (
        <div
            className={[
                'flex cursor-pointer',
                containerClassName,
            ].join(' ')}
            onClick={onClick}
        >
            <div className={[
                'select-none py-1 px-2 flex justify-center items-center gap-1 whitespace-nowrap',
                size,
                className,
            ].join(' ')}>
                {/* Trigger Icon - left */}
                {iconPosition === 'left' && (
                    <div className='flex justify-center items-center'>
                        {icon}
                    </div>
                )}
                {/* Trigger text */}
                {children}
                {/* Trigger Icon - right */}
                {iconPosition === 'right' && (
                    <div className='flex justify-center items-center'>
                        {icon}
                    </div>
                )}
            </div>

        </div>
    )
}

export const DropdownMenu = ({
    children,
    megaMenu = false,
}) => {
    return (
        <div className='absolute bg-white max-w-[300px] min-w-[160px] h-fit w-fit max-h-[400px] overflow-y-scroll p-2 top-full mt-1 flex flex-col z-50 rounded'>
            {children}
        </div>
    )
}

export const DropdownItem = ({
    children,
    onClick,
    icon = null,
    selected,
}) => {
    return (
        <div
            className={[
                'flex px-2 py-1 rounded justify-between cursor-pointer gap-3',
                'hover:bg-layout-100',
            ].join(' ')}
            onClick={onClick}
        >
            <div className="flex items-center gap-1" >

                {/* Item Icon */}
                {icon && (
                    <div className='flex justify-center items-center'>
                        {icon}
                    </div>
                )}
                <div className="flex items-center gap-1" >
                    <span className='whitespace-nowrap'>
                        {children}
                    </span>
                </div>
            </div>
            {
                selected && (
                    <div className="flex justify-center items-center">
                        <FiCheck className='text-primary-500' />
                    </div>
                )
            }
        </div>
    )
}