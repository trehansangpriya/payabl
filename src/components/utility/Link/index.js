import React, { useEffect, useState } from 'react'
import NextLink from 'next/link'

const Link = ({
    children,
    color = 'default',
    className,
    href,
    as = href,
    target = '_self',
    disabled = false,
    iconLeft,
    iconRight,
}) => {
    const [linkColor, setLinkColor] = useState('')
    useEffect(() => {
        // Link Colors
        const linkColors = {
            default: 'text-layout-800',
            primary: 'text-primary-600 hover:text-primary-700 active:text-primary-700',
            error: 'text-error-500 hover:text-error-600 active:text-error-600',
            success: 'text-success-500 hover:text-success-600 active:text-success-600',
            warning: 'text-warning-500 hover:text-warning-600 active:text-warning-600',
            info: 'text-info-500 hover:text-info-600 active:text-info-600',
            none: '',
        }
        setLinkColor(linkColors[color])
    }, [color])
    return (
        <NextLink href={href} as={as}>
            <a
                className={[
                    'font-medium',
                    'transition-all duration-150',
                    'flex justify-center items-center',
                    !disabled && 'active:scale-[.98] hover:scale-[1.01]',
                    !disabled ? linkColor : 'text-layout-300  pointer-events-none cursor-not-allowed',
                    className
                ].join(' ')}
                target={target}
                disabled={disabled}
                id='link'
            >
                {iconLeft && <span className={`mr-[4px]`}>{iconLeft}</span>}
                {children}
                {iconRight && <span className={`ml-[4px]`}>{iconRight}</span>}
            </a>
        </NextLink>
    )
}

export default Link