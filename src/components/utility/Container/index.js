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
                'relative',
                className,
            ].join(' ')} {...props}
        >
            {children}
        </div>
    )
}

export default Container