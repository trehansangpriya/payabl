import Image from 'next/image'
import React from 'react'
import { FiUser } from 'react-icons/fi'

const Avatar = ({
    color = 'default',
    src,
    alt,
    text,
    icon = <FiUser size={22} />,
    fontSize = '18px',
    size = '48px',
    bordered = false,
    pointer = false,
    zoomed,
    ...props
}) => {
    const avatarColors = {
        default: 'bg-layout-200 text-layout-800',
        primary: 'bg-primary-100 text-primary-600',
        success: 'bg-success-100 text-success-600',
        error: 'bg-error-100 text-error-600',
        warn: 'bg-warn-100 text-warn-600',
        info: 'bg-info-100 text-info-600',
    }
    const avatarBorderColors = {
        default: 'border-layout-200',
        primary: 'border-primary-500',
        success: 'border-success-500',
        error: 'border-error-500',
        warn: 'border-warn-500',
        info: 'border-info-500',
    }
    return (
        <div className={[
            'flex items-center justify-center rounded-full w-fit',
            bordered && `border-[3px] border-solid ${avatarBorderColors[color]}`,
            'hover:contrast-[90%] transition-all',
        ].join(' ')}
            {...props}
        >
            <div
                className={[
                    'flex items-center justify-center rounded-full m-[2px]',
                    'font-semibold overflow-clip',
                    pointer && 'cursor-pointer',
                    avatarColors[color],
                ].join(' ')}
                style={{
                    fontSize,
                    width: size,
                    height: size,
                }}
            >
                {
                    src ? <Image className={[
                        'rounded-full transition-all',
                        zoomed && 'hover:scale-110',
                    ].join(' ')}
                        src={src}
                        alt={alt}
                        height={size}
                        width={size}
                    />
                        : text ? text.split(" ").map((n, i, a) => i === 0 || i + 1 === a.length ? n[0] : null).join("")
                            : icon
                }
            </div>
        </div>
    )
}

export default Avatar