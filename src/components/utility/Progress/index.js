import React, { useEffect, useState } from 'react'
import { FiCheckCircle } from 'react-icons/fi'

const Progress = ({
    color = 'default',
    value = 0,
    max = 100,
    min = 0,
    badge = '',
    badgeIcon = null,
    completeMessage = 'Done',
    showBadge = true,
    showValue = true,
    infinite = false,
    size = '8px',
    wrapperClassName,
    progressTrackClassName,
    progressBarClassName,
    badgeClassName,
    valueClassName,
    ...props
}) => {
    const progressColors = {
        default: 'bg-primary-500',
        primary: 'bg-primary-500',
        error: 'bg-error-500',
        success: 'bg-success-500',
        warn: 'bg-warn-500',
        info: 'bg-info-500',
    }
    const progressTrackColors = {
        default: 'bg-layout-200',
        primary: 'bg-primary-100',
        success: 'bg-success-100',
        error: 'bg-error-100',
        warn: 'bg-warn-100',
        info: 'bg-info-100',
    }
    const badgeColors = {
        default: 'bg-layout-200 text-layout-800',
        primary: 'bg-primary-100 text-primary-600',
        success: 'bg-success-100 text-success-600',
        error: 'bg-error-100 text-error-600',
        warn: 'bg-warn-100 text-warn-600',
        info: 'bg-info-100 text-info-600',
    }
    const valueColors = {
        default: 'text-layout-800',
        primary: 'text-primary-600',
        success: 'text-success-600',
        error: 'text-error-600',
        warn: 'text-warn-600',
        info: 'text-info-600',
    }
    const [progressColor, setProgressColor] = useState(progressColors[color])
    const [progressTrackColor, setProgressTrackColor] = useState(progressTrackColors[color])
    const [badgeColor, setBadgeColor] = useState(badgeColors[color])
    const [valueColor, setValueColor] = useState(valueColors[color])
    useEffect(() => {
        setProgressColor(progressColors[color])
        setProgressTrackColor(progressTrackColors[color])
        setBadgeColor(badgeColors[color])
        setValueColor(valueColors[color])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [color, status])
    return (
        <div className={[
            'flex flex-col gap-2 w-full min-w-[300px] max-w-[80%] ',
            wrapperClassName,
        ].join(' ')}>
            {
                (showBadge || showValue) && (
                    <div className="flex justify-between items-center text-sm font-medium ">
                        {/* Badge */}
                        {
                            showBadge && badge && (
                                <div className={[
                                    'flex gap-1 items-center justify-center px-2 py-1 rounded-full',
                                    value === max ? badgeColors['success'] : badgeColor,
                                    badgeClassName,
                                ].join(' ')}>
                                    {
                                        value === max ? (
                                            <>
                                                <FiCheckCircle />
                                                {completeMessage}
                                            </>
                                        ) : (
                                            <>
                                                {badgeIcon}
                                                {badge}
                                            </>
                                        )
                                    }
                                </div>
                            )
                        }
                        {/* Progress */}
                        {
                            showValue && (
                                <div className={[
                                    'flex items-center justify-center',
                                    value === max ? valueColors['success'] : valueColor,
                                    valueClassName,
                                    infinite && 'hidden'
                                ].join(' ')}>
                                    {value}%
                                </div>
                            )
                        }
                    </div>
                )
            }
            {/* Progress Bar */}
            <div
                className={[
                    `w-full rounded-full overflow-hidden`,
                    'transition-all duration-300 ease-in-out',
                    progressTrackColor,
                    progressTrackClassName,
                ].join(' ')}
                style={{
                    height: size,
                }}
                {...props}
            >
                <div
                    className={[
                        'w-full h-full rounded-full',
                        'transition-all duration-300 ease-in-out',
                        !infinite && value !== max && 'animate-pulse',
                        infinite && 'animate-infinite-progress',
                        value === max ? progressColors['success'] : progressColor,
                        progressBarClassName,
                    ].join(' ')}
                    style={{
                        width: !infinite ? `${(value - min) / (max - min) * 100}%` : '40%',
                    }}
                />
            </div>
        </div>
    )
}

export default Progress