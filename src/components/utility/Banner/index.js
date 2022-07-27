import React, { useEffect, useState } from 'react'
import { FiXCircle, FiAlertTriangle, FiCheckCircle, FiInfo } from 'react-icons/fi'


const Banner = ({
    children,
    className,
    variant,
    ...props
}) => {
    const variants = {
        error: 'bg-error-100 text-error-600',
        success: 'bg-success-100 text-success-600',
        warn: 'bg-warn-100 text-warn-600',
        info: 'bg-info-100 text-info-600',
    }
    const icons = {
        error: <FiXCircle size='16px' />,
        success: <FiCheckCircle size='16px' />,
        warn: <FiAlertTriangle size='16px' />,
        info: <FiInfo size='16px' />,
    }
    const [bannerVariant, setBannerVariant] = useState(variants[variant])
    const [bannerIcon, setBannerIcon] = useState(icons[variant])

    useEffect(() => {
        setBannerVariant(variants[variant])
        setBannerIcon(icons[variant])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [variant])

    return (
        <div className={[
            'p-2',
            'flex justify-center items-center gap-2',
            'w-full',
            'text-sm font-medium',
            bannerVariant,
            className,
        ].join(' ')}
            id='banner'
            {...props}
        >
            {bannerIcon}
            {children}
        </div>
    )
}

export default Banner