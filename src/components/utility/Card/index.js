import React from 'react'

const Card = ({
    children,
    pointer,
    className,
    shadow,
    rounded,
    hover,
    ...props
}) => {

    return (
        <div id='card' className={[
            'p-3 m-1 flex gap-1 transition-all duration-300 ease-in-out bg-layout-100',
            pointer && 'cursor-pointer',
            shadow && 'shadow',
            rounded && 'rounded',
            hover && 'hover:brightness-95',
            className
        ].join(' ')} {...props} >
            {children}
        </div>
    )
}

export default Card