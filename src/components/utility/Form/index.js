import React, { useEffect } from 'react'

const Form = ({ children, onSubmit = () => { }, allowSubmit = true, setAllowSubmit = () => { }, errors = {}, className = '', ...formProps }) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        if (allowSubmit) {
            onSubmit()
        }
    }
    useEffect(() => {
        setAllowSubmit(!Object.values(errors).filter(err => err.status !== 'success').length > 0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors])
    return (
        <form
            className={`w-full max-w-[80%] min-w-[300px] ${className}`}
            onSubmit={handleSubmit}
            autoComplete='off'
            {...formProps}
        >
            {children}
        </form>
    )
}

export default Form