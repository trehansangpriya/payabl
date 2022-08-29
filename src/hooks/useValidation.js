import validator from 'validator'
const useValidation = () => {
    const checkEmpty = (value, input, errors, setErrors) => {
        if (value === '') {
            setErrors({
                ...errors, [input]: {
                    status: 'error',
                    helperText: 'This field is required'
                }
            })
            return
        }
        setErrors({
            ...errors, [input]: {
                status: 'success',
                helperText: ''
            }
        })
        return

    }

    const checkNumber = (value, input, errors, setErrors, required = true, moreThan = 0) => {
        if (required && value === '') {
            setErrors({
                ...errors, [input]: {
                    status: 'error',
                    helperText: 'This field is required'
                }
            })
            return
        }
        if (value !== '' && !validator.isNumeric(value)) {
            setErrors({
                ...errors, [input]: {
                    status: 'error',
                    helperText: 'This field must be a number'
                }
            })
            return
        }
        if (value !== '' && value <= moreThan) {
            setErrors({
                ...errors, [input]: {
                    status: 'error',
                    helperText: 'Minimum - ' + (moreThan + 1)
                }
            })
            return
        }
        setErrors({
            ...errors, [input]: {
                status: 'success',
                helperText: ''
            }
        })
        return

    }

    const checkAmount = (value, input, errors, setErrors, required = true, checkLessThan = false, lessThan = 0, msg = 'Minimum - ') => {
        if (required && value === '') {
            setErrors({
                ...errors, [input]: {
                    status: 'error',
                    helperText: 'This field is required'
                }
            })
            return
        }
        if (value !== '' && !validator.isNumeric(value)) {
            setErrors({
                ...errors, [input]: {
                    status: 'error',
                    helperText: 'This field must be a number'
                }
            })
            return
        }
        // if (value !== '' && value === 0) {
        //     setErrors({
        //         ...errors, [input]: {
        //             status: 'error',
        //             helperText: 'Amount cannot be zero'
        //         }
        //     })
        //     return
        // }
        if (value !== '' && value <= 0) {
            setErrors({
                ...errors, [input]: {
                    status: 'error',
                    helperText: 'Amount cannot be zero or negative'
                }
            })
            return
        }
        if (value !== '' && checkLessThan && value > lessThan) {
            setErrors({
                ...errors, [input]: {
                    status: 'error',
                    helperText: msg + lessThan
                }
            })
            return
        }
        setErrors({
            ...errors, [input]: {
                status: 'success',
                helperText: ''
            }
        })
        return
    }

    const checkPhoneNumber = (value, input, errors, setErrors) => {
        if (value === '') {
            setErrors({
                ...errors, [input]: {
                    status: 'error',
                    helperText: 'This field is required'
                }
            })
            return
        }
        if (!validator.isMobilePhone(value, 'en-IN')) {
            setErrors({
                ...errors, [input]: {
                    status: 'error',
                    helperText: 'Enter a valid phone number'
                }
            })
            return
        }
        setErrors({
            ...errors, [input]: {
                status: 'success',
                helperText: ''
            }
        })
        return
    }

    const checkEmail = (value, input, errors, setErrors, required = true) => {
        if (required && value === '') {
            setErrors({
                ...errors, [input]: {
                    status: 'error',
                    helperText: 'This field is required'
                }
            })
            return
        }
        if (value !== '' && !validator.isEmail(value)) {
            setErrors({
                ...errors, [input]: {
                    status: 'error',
                    helperText: 'Enter a valid email'
                }
            })
            return
        }
        setErrors({
            ...errors, [input]: {
                status: 'success',
                helperText: ''
            }
        })
        return
    }

    const checkURL = (value, input, errors, setErrors, required = true) => {
        if (required && value === '') {
            setErrors({
                ...errors, [input]: {
                    status: 'error',
                    helperText: 'This field is required'
                }
            })
            return
        }
        // check if url is valid or a tel: link
        if (value !== '' && !validator.isURL(value)) {
            setErrors({
                ...errors, [input]: {
                    status: 'error',
                    helperText: 'Enter a valid URL'
                }
            })
            return
        }
        setErrors({
            ...errors, [input]: {
                status: 'success',
                helperText: ''
            }
        })
        return
    }

    return {
        checkEmpty,
        checkNumber,
        checkAmount,
        checkPhoneNumber,
        checkEmail,
        checkURL,
    }
}

export default useValidation