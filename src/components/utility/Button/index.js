import React, { useEffect, useState } from 'react'
import useGlobals from '@/Contexts/useGlobals'

const Button = ({
    children,
    type = 'button',
    color = 'primary',
    className,
    onClick,
    onSubmit,
    disabled,
    iconLeft,
    iconRight,
    circle,
    ...props
}) => {
    // Global loading state
    const { loading } = useGlobals()

    // Button Colors
    const buttonColors = {
        primary: 'text-layout-100 bg-primary-500 hover:bg-primary-600 active:bg-primary-600',
        error: 'text-layout-100 bg-error-500 hover:bg-error-600 active:bg-error-600',
        success: 'text-layout-100 bg-success-500 hover:bg-success-600 active:bg-success-600',
        warn: 'text-layout-100 bg-warn-500 hover:bg-warn-600 active:bg-warn-600',
        info: 'text-layout-100 bg-info-500 hover:bg-info-600 active:bg-info-600',
    }

    // Button Color State
    const [buttonColor, setButtonColor] = useState(buttonColors[color])

    useEffect(() => {
        setButtonColor(buttonColors[color])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [color])
    return (
        <button
            className={[
                'font-medium',
                'p-3 transition-all duration-150',
                circle ? 'rounded-full' : 'rounded',
                'flex justify-center items-center lg:w-fit lg:self-start',
                !disabled && 'active:scale-[.98] hover:scale-[1.005]',
                !disabled ? buttonColor : 'bg-layout-300 text-layout-100 cursor-not-allowed',
                className
            ].join(' ')}
            type={type}
            onClick={onClick}
            onSubmit={onSubmit}
            disabled={loading || disabled}
            id='button'
            {...props}
        >
            {iconLeft && <span className={`mr-[8px]`}>{iconLeft}</span>}
            {children}
            {iconRight && <span className={`ml-[8px]`}>{iconRight}</span>}
        </button>
    )
}

export default Button