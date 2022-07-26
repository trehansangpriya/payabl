import { Avatar } from '@/Components/utility'
import useAuth from '@/Contexts/useAuth'
import React from 'react'

const AppTopBar = ({
}) => {
    const { userData } = useAuth()
    return (
        <div
            className='flex justify-between items-center w-full p-1 border-b-2'
        >
            {/* Left Content */}
            <div className='flex'>
                <Avatar
                    src={userData?.photoURL}
                    alt={userData?.displayName}
                    text={userData?.displayName}
                    zoomed
                    pointer
                    size='42px'
                />
            </div>

            {/* Right Content */}
        </div>
    )
}

export default AppTopBar