import React, { useEffect, useRef, useState } from 'react'
import { FiCheck } from 'react-icons/fi'
import { Button } from '@/Components/utility';

const Dropdown = ({
    className = '',
    type = 'default',
    children

}) => {
    return (
        // Dropdown container
        <div className={[
            type === 'default' ? 'relative' : '',
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
                {iconPosition === 'left' && icon && (
                    <div className='flex justify-center items-center'>
                        {icon}
                    </div>
                )}
                {/* Trigger text */}
                {children}
                {/* Trigger Icon - right */}
                {iconPosition === 'right' && icon && (
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
    type = 'default',
    show = false,
    setShow = () => { },
}) => {
    const dropdown = useRef(null)
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdown.current && !dropdown.current.contains(e.target)) {
                setShow(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show])
    if (type === 'modal') {
        return show ? (
            <div className={[
                'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl w-full h-full bg-black bg-opacity-50 z-50',
                'flex justify-center items-center',
            ].join(' ')}>
                <div className={[
                    'bg-white h-fit max-h-[400px] max-w-[50%] md:max-w-[38%] w-full overflow-y-scroll p-2 flex flex-col rounded'
                ].join(' ')} ref={dropdown}>
                    {children}
                </div>
            </div>
        ) : null
    }
    return show ? (
        // Dropdown menu
        <div className='' ref={dropdown}>
            <div className='absolute top-full mt-1 max-w-[300px] min-w-[160px] w-fit bg-white  h-fit  max-h-[400px] overflow-y-scroll p-2 flex flex-col z-50 rounded'>
                {children}
            </div>
        </div>
    ) : null
}

export const DropdownMegaMenu = ({
    show = false,
    setShow = () => { },
    categories = [],
    components = [],
    action = () => { },
}) => {
    const [categoryIndex, setCategoryIndex] = useState(0)
    const dropdown = useRef(null)
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdown.current && !dropdown.current.contains(e.target)) {
                setShow(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show])
    return show ? (
        <div className={[
            'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl w-full h-full bg-black bg-opacity-50 z-50',
            'flex flex-col justify-center items-center gap-1',
        ].join(' ')}>
            <div className="flex flex-col gap-2 bg-white p-2 rounded w-full max-w-[80%] md:max-w-[38%]" ref={dropdown}>
                <div className={[
                    'w-full flex gap-2 min-h-[200px] h-fit max-h-[200px]'
                ].join(' ')} >
                    <div className="flex flex-col">
                        {
                            categories.map((category, index) => (
                                <span
                                    className={[
                                        'cursor-pointer hover:text-primary-500 p-1 select-none',
                                        categoryIndex === index ? 'text-primary-500' : ''
                                    ].join(' ')}
                                    key={index}
                                    onClick={() => setCategoryIndex(index)}
                                >
                                    {category}
                                </span>
                            ))
                        }
                    </div>
                    <div className="flex flex-col w-full overflow-y-scroll border-l p-1">
                        {components[categoryIndex]}
                    </div>
                </div>
                <div className="flex justify-center">
                    <Button className={'w-full'} onClick={action}>Apply Filter</Button>
                </div>
            </div>
        </div>
    ) : null
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