import React, { useEffect, useState } from 'react'

const Pill = ({
    children,
    color = 'default',
    icon = null,
    size = '14px',
    className,
    ...props
}) => {
    const pillColors = {
        default: 'bg-layout-200 text-layout-800',
        primary: 'bg-primary-100 text-primary-600',
        success: 'bg-success-100 text-success-600',
        error: 'bg-error-100 text-error-600',
        warn: 'bg-warn-100 text-warn-600',
        info: 'bg-info-100 text-info-600',
    }
    const [pillColor, setPillColor] = useState(pillColors[color])
    useEffect(() => {
        setPillColor(pillColors[color])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [color])
    return (
        <div className={[
            'flex gap-1 items-center justify-center px-2 py-1 rounded-full w-fit',
            'font-semibold',
            pillColor,
            className,
        ].join(' ')}
            style={{
                fontSize: size,
            }}
            {...props}
        >
            {icon && icon}
            {children}
        </div>
    )
}

export default Pill