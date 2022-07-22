import React, { useEffect, useState } from 'react'

const TextArea = ({
    status = 'default',
    id,
    name,
    placeholder,
    label,
    showLabel = true,
    value,
    onChange,
    onKeyUp,
    disabled = false,
    required = false,
    readOnly = false,
    wrapperClass,
    labelClass,
    inputClass,
    helperClass,
    helperText,
    showHelperText = true,
    rows = '2',
    resize = true,
    maxLength = '300',
    minLength = '0',
    ...props
}) => {
    const inputStatuses = {
        default: 'text-layout-700 placeholder:text-layout-500 bg-layout-100 focus:bg-primary-50 focus:border-2 focus:border-primary-300 focus:text-primary-700',
        primary: 'placeholder:text-layout-500 bg-primary-100 focus:border-2 border-primary-300 text-primary-700',
        error: 'placeholder:text-layout-500 bg-error-100 focus:border-2 border-error-300 text-error-700',
        success: 'placeholder:text-layout-500 bg-success-100 focus:border-2 border-success-300 text-success-700',
        warn: 'placeholder:text-layout-500 bg-warn-100 focus:border-2 border-warn-300 text-warn-700',
        info: 'placeholder:text-layout-500 bg-info-100 focus:border-2 border-info-300 text-info-700',
    }
    const helperTextStatuses = {
        default: 'text-layout-500',
        primary: 'text-primary-600',
        error: 'text-error-600',
        success: 'text-success-600',
        warn: 'text-warn-600',
        info: 'text-info-600',
    }

    const [inputStatus, setInputStatus] = useState(inputStatuses[status])
    const [helperTextStatus, setHelperTextStatus] = useState(helperTextStatuses[status])
    useEffect(() => {
        setInputStatus(inputStatuses[status])
        setHelperTextStatus(helperTextStatuses[status])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status])
    return (
        <div
            className={[
                'flex flex-col max-w-[80%] min-w-[300px]',
                wrapperClass,
                disabled && 'opacity-50',
            ].join(' ')}
        >
            {/* Label */}
            {
                showLabel && label &&
                <label
                    className={[
                        'text-sm mb-1 ml-1',
                        labelClass,
                    ].join(' ')}
                >
                    {label}
                    {required && <span className='text-error-400'> *</span>}
                </label>
            }

            {/* Textarea */}
            <textarea
                id={id || name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyUp={onKeyUp}
                disabled={disabled}
                required={required}
                readOnly={readOnly}
                autoComplete='off'
                rows={rows}
                maxLength={maxLength}
                minLength={minLength}
                className={[
                    'w-full px-3 py-2 rounded',
                    'outline-none transition-all',
                    'text-base',
                    !resize && 'resize-none',
                    inputStatus,
                    disabled && 'cursor-not-allowed',
                    inputClass,
                ].join(' ')}
                {...props}
            ></textarea>

            {/* Helper Text */}
            {
                showHelperText && helperText && (
                    <small className={[
                        'mt-1 ml-1 text-xs',
                        helperTextStatus,
                        helperClass,
                    ].join(' ')}>
                        {helperText}
                    </small>
                )
            }
        </div>
    )
}

export default TextArea