import React from 'react'

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
        'strong': 'font-bold',
        'em': 'font-italic',
        'i': 'font-italic',
        'b': 'font-bold',
        'u': 'text-underline',
        'code': 'font-mono',
    }
    return (
        React.createElement(tag, {
            className: `${textStyles[tag] || ''} ${className || ''}`,
            ...props,
        }, children)
    )
}

export default Text