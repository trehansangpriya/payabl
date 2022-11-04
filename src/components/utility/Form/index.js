import React, { useEffect } from 'react'

const Form = ({ children, onSubmit = () => { }, allowSubmit = true, setAllowSubmit = () => { }, errors = {}, className = '', wFull = false, ...formProps }) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        if (allowSubmit) {
            onSubmit()
        }
    }
    useEffect(() => {
        // setAllowSubmit(!Object.values(errors).filter(err => err.status !== 'success').length > 0)
        setAllowSubmit(Object.values(errors).every(error => error.status === 'success'))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors])
    return (
        <form
            className={[
                'w-full min-w-[300px] ',
                wFull ? 'w-full' : 'max-w-[80%]',
                className
            ].join(' ')}
            onSubmit={handleSubmit}
            autoComplete='off'
            {...formProps}
        >
            {children}
        </form>
    )
}

export default Form