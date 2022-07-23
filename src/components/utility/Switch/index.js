import React, { useEffect, useState } from 'react'

const Switch = ({
    disabled = false,
    color = 'primary',
    state = false,
    onChange = () => { },
    icon,
    iconOn,
    iconOff,
    ...props
}) => {
    const switchColors = {
        primary: 'bg-primary-500',
        error: 'bg-error-500',
        success: 'bg-success-500',
        warn: 'bg-warn-500',
        info: 'bg-info-500',
    }
    const [switchColor, setSwitchColor] = useState(switchColors[color])
    useEffect(() => {
        setSwitchColor(switchColors[color])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [color])
    return (
        <div
            className={[
                'w-14 p-1 flex items-center rounded-full',
                'transition-all duration-300 ease-in-out',
                'group relative',
                disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
                state ? switchColor : 'bg-layout-200',
            ].join(' ')}
            onClick={!disabled ? onChange : () => { }}
            {...props}
        >
            <div className={[
                'flex h-[24px] w-[24px] rounded-full bg-white items-center justify-center shadow-sm',
                'transition-all duration-300 ease-in-out',
                state ? 'translate-x-full' : 'translate-x-0',
            ].join(' ')}>
            </div>
        </div>
    )
}

export default Switch