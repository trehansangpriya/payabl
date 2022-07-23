import React, { useEffect, useState } from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

// create component Collapse.Group
export const CollapseGroup = ({
    children,
    gap
}) => {
    return (
        <div className='flex flex-col' style={{
            gap: gap ? gap : '12px'
        }} >
            {children}
        </div>
    )
}

const Collapse = ({
    children,
    title,
    subtitle,
    width,
    contentLeft,
    arrowIcon,
    expanded = false,
    disabled,
    showArrow = true,
}) => {
    const [isOpen, setIsOpen] = useState(expanded)
    useEffect(() => {
        setIsOpen(expanded)
    }, [expanded])
    return (
        <div className={[
            'rounded min-w-[300px] max-w-[80%] shadow py-2 px-3 transition-all',
            disabled && 'opacity-50 cursor-not-allowed',
        ].join(' ')}
            style={{
                width: width ? width : '300px',
            }}
        >
            <div
                id="trigger"
                onClick={!disabled ? () => setIsOpen(!isOpen) : null}
                className={[
                    'flex justify-between items-center',
                    !disabled && 'cursor-pointer',
                ].join(' ')}
            >
                <div className="flex gap-2">
                    {
                        contentLeft && (
                            <div id="contentLeft">
                                {contentLeft}
                            </div>
                        )
                    }
                    <div id="text">
                        <h3 className='font-semibold text-lg'>
                            {title}
                        </h3>
                        <p className='font-medium text-layout-500'>
                            {subtitle}
                        </p>
                    </div>
                </div>
                {showArrow && (
                    <div id="arrow">
                        {
                            arrowIcon ? (
                                <div
                                    className={[
                                        'flex items-center justify-center transition-all duration-300',
                                        isOpen ? 'rotate-180' : 'rotate-0',
                                    ].join(' ')}
                                >
                                    {arrowIcon}
                                </div>
                            ) : (
                                <div
                                    className={[
                                        'flex items-center justify-center transition-all duration-300',
                                        isOpen ? 'rotate-180' : 'rotate-0',
                                    ].join(' ')}
                                >
                                    <FiChevronDown size={20} />
                                </div>
                            )
                        }
                    </div>
                )}
            </div>
            {
                isOpen &&
                <div
                    className={[
                        'mt-3'
                    ].join(' ')}
                    id="content"
                >
                    {children}
                </div>
            }
        </div>
    )
}

export default Collapse