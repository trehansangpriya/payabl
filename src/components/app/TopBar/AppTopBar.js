import { Avatar, Link } from '@/Components/utility'
import useAuth from '@/Contexts/useAuth'
import React from 'react'

const AppTopBar = ({
    rightContent,
}) => {
    const { userData } = useAuth()
    return (
        <div
            className='flex justify-between items-center w-full p-2 z-10 bg-layout-100 max-h-[60px] border-b-[1px] border-layout-200'
        >
            {/* Left Content */}
            <Link
                href={'/profile'}
            >
                <div className='flex flex-1 justify-start items-center gap-2'>
                    <Avatar
                        src={userData?.photoURL}
                        alt={userData?.displayName}
                        text={userData?.displayName}
                        zoomed
                        pointer
                        size='36px'
                    />
                    <span
                        className='font-medium text-lg'
                    >
                        Hi {userData?.displayName.split(' ')[0]}
                    </span>
                </div>
            </Link>
            {/* Right Content */}
            <div className='flex flex-1 justify-end items-center gap-2'>
                {rightContent}
            </div>
        </div>
    )
}

export default AppTopBar