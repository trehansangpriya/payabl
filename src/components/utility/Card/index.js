import React from 'react'

const Card = ({
    children,
    pointer,
    className,
    ...props
}) => {

    return (
        <div id='card' className={[
            'shadow rounded p-3 m-1 flex gap-1 transition-all duration-300 ease-in-out bg-layout-100',
            'hover:shadow-none',
            pointer && 'cursor-pointer',
            className
        ].join(' ')} {...props} >
            {children}
        </div>
    )
}

export default Card