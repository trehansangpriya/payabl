import { Spacer } from '@/Components/utility'
import Image from 'next/image'
import React from 'react'

const NotFound = ({
    message,
}) => {
    return (
        <div className='flex flex-col justify-center items-center gap-3 w-full text-layout-500'>
            <Spacer h='24px' />
            <Image
                src={'/assets/icons/empty.png'}
                alt='empty'
                width={100}
                height={100}
            />
            <div>
                {message}
            </div>
        </div>
    )
}

export default NotFound