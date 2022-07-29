import React, { useEffect, useState } from 'react'
import bottomBarLinks from '@/Data/bottomBarLinks'
import { Link } from '@/Components/utility'
import { useRouter } from 'next/router'

const BottomBar = ({
    className
}) => {
    return (
        <div
            className={`flex justify-evenly items-center p-2 absolute w-full left-0 bottom-0 right-0 bg-layout-100 border-t-[1px] border-layout-200 max-h-[60px] ${className}`}
        >
            {bottomBarLinks.map((link, index) => {
                return (
                    <BottomBarLink
                        key={index}
                        icon={link.icon}
                        label={link.label}
                        href={link.href}
                    />
                )
            })}
        </div>
    )
}

const BottomBarLink = ({
    icon,
    label,
    href,
}) => {
    const [isActive, setIsActive] = useState(false)
    const router = useRouter()
    useEffect(() => {
        if (router.pathname === href) {
            setIsActive(true)
        }
    }, [router.pathname, href])
    return (
        <div>
            <Link
                href={href}
                color={isActive ? 'primary' : 'default'}
            >
                <div
                    className={[
                        'flex flex-col items-center justify-center w-full text-center gap-1'
                    ].join(' ')}
                >
                    <span>
                        {icon}
                    </span>
                    <span
                        className='text-xs font-medium'
                    >
                        {label}
                    </span>
                </div>
            </Link>
        </div>
    )
}

export default BottomBar