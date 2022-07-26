import React, { useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'

const FAB = ({
    label,
    icon = <FiPlus />,
    showIcon = true,
    color = 'primary',
    onClick,
    className,
    disabled,
    ...props
}) => {
    const FABColors = {
        primary: 'text-layout-100 bg-primary-500 hover:bg-primary-600 active:bg-primary-600',
        error: 'text-layout-100 bg-error-500 hover:bg-error-600 active:bg-error-600',
        success: 'text-layout-100 bg-success-500 hover:bg-success-600 active:bg-success-600',
        warn: 'text-layout-100 bg-warn-500 hover:bg-warn-600 active:bg-warn-600',
        info: 'text-layout-100 bg-info-500 hover:bg-info-600 active:bg-info-600',
    }
    const [FABColor, setFABColor] = useState(FABColors[color])
    useEffect(() => {
        setFABColor(FABColors[color])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [color])
    return (
        <button
            onClick={onClick}
            {...props}
            className={[
                'flex justify-center items-center gap-1',
                'font-medium',
                'p-4 rounded-full transition-all duration-150',
                'fixed bottom-0 right-0 mb-[76px] mr-4 shadow-md',
                !disabled && 'active:scale-[.98] hover:scale-[1.02]',
                !disabled ? FABColor : 'bg-layout-300 text-layout-100 cursor-not-allowed',
                className,
            ].join(' ')}
        >
            {showIcon && icon && <span>{icon}</span>}
            {label && <span>{label}</span>}
        </button>
    )
}

export default FAB