import React from 'react'

const Container = ({
    children,
    className,
    ...props
}) => {
    return (
        <div
            id='container'
            className={[
                className,
            ].join(' ')} {...props}
        >
            {children}
        </div>
    )
}

export default Container