import React from 'react'

const Form = ({ children, onSubmit, className = '', ...formProps }) => {
    return (
        <form
            className={`w-fit ${className}`}
            onSubmit={onSubmit}
            autoComplete='off'
            {...formProps}
        >
            {children}
        </form>
    )
}

export default Form