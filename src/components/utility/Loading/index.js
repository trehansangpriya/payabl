import React from 'react'
import Image from 'next/image'

const Loading = ({
    message,
    modal,
    inline
}) => {
    if (inline) {
        return (
            <div className="flex w-full justify-center mt-5 gap-2 items-center">
                <Image
                    src="/assets/gifs/loading.gif"
                    alt="Loading..."
                    width={32}
                    height={32}
                    layout="fixed"
                />
                {message && <div>{message}</div>}
            </div>
        )
    }
    if (modal) {
        return (
            <div className='w-full h-screen fixed top-0 right-0 bg-black bg-opacity-40 flex  items-center justify-center z-50'>
                <div className="bg-white py-10 px-4 rounded shadow min-w-[280px] flex flex-col gap-2 items-center justify-center">
                    <Image
                        src="/assets/gifs/loading.gif"
                        alt="Loading"
                        width={48}
                        height={48}
                    />
                    {message && <div>{message}</div>}
                </div>
            </div>
        )
    }
    return (
        <div className="w-full h-screen fixed top-0 right-0 bg-white z-50">
            <div className="w-full h-full flex flex-col items-center gap-2 justify-center">
                <Image
                    src="/assets/gifs/loading.gif"
                    alt="Loading"
                    width={48}
                    height={48}
                />
                {message && <div>{message}</div>}
            </div>
        </div>
    )
}

export default Loading