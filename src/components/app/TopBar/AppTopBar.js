import { Avatar, Link } from '@/Components/utility'
import useAuth from '@/Contexts/useAuth'
import React from 'react'

const AppTopBar = ({
    userData,
    rightContent,
}) => {
    return (
        <div
            className='flex justify-between items-center w-full p-2 shadow'
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