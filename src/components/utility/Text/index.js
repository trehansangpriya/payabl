import React, { useEffect, useState } from 'react'

const Text = ({
    children,
    tag = 'p',
    className,
    ...props
}) => {
    const textStyles = {
        'h1': 'font-bold text-4xl lg:text-5xl',
        'h2': 'font-bold text-3xl lg:text-4xl',
        'h3': 'font-bold text-2xl lg:text-3xl',
        'h4': 'font-bold text-xl lg:text-2xl',
        'h5': 'font-bold text-lg lg:text-xl',
        'h6': 'font-bold text-md lg:text-lg',
        'p': 'text-base font-medium',
        'span': 'text-base font-medium',
        'small': 'text-sm font-medium',
        'code': 'font-mono',
    }
    // const [textStyle, setTextStyle] = useState(textStyles[tag])
    // useEffect(() => {
    //     setTextStyle(textStyles[tag])
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [tag])
    switch (tag) {
        case 'h1':
            return (
                <h1 className={[
                    'font-bold text-4xl lg:text-5xl',
                    className
                ].join(' ')} {...props} >
                    {children}
                </h1>
            )
        case 'h2':
            return (
                <h2 className={[
                    'font-bold text-3xl lg:text-4xl',
                    className
                ].join(' ')} {...props} >
                    {children}
                </h2>
            )
        case 'h3':
            return (
                <h3 className={[
                    'font-bold text-2xl lg:text-3xl',
                    className
                ].join(' ')} {...props} >
                    {children}
                </h3>
            )
        case 'h4':
            return (
                <h4 className={[
                    textStyles[tag],
                    className
                ].join(' ')} {...props} >
                    {children}
                </h4>
            )
        case 'h5':
            return (
                <h5 className={[
                    textStyles[tag],
                    className
                ].join(' ')} {...props} >
                    {children}
                </h5>
            )
        case 'h6':
            return (
                <h6 className={[
                    textStyles[tag],
                    className
                ].join(' ')} {...props} >
                    {children}
                </h6>
            )
        case 'p':
            return (
                <p className={[
                    textStyles[tag],
                    className
                ].join(' ')} {...props} >
                    {children}
                </p>
            )
        case 'span':
            return (
                <span className=
                    {[
                        textStyles[tag],
                        className
                    ].join(' ')} {...props} >
                    {children}
                </span>
            )
        case 'small':
            return (
                <small className
                    ={[
                        textStyles[tag],
                        className
                    ].join(' ')} {...props}>
                    {children}
                </small>
            )
        case 'code':
            return (
                <code className=
                    {[
                        textStyles[tag],
                        className
                    ].join(' ')} {...props}>
                    {children}
                </code>
            )
    }
    return (
        <p className={[
            'text-base font-medium',
            className
        ].join(' ')} {...props} >
            {children}
        </p>

    )
}

export default Text