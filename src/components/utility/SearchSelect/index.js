import React, { useEffect, useState } from 'react'

const SearchSelect = ({
    className = '',
    status = 'default',
    data = [],
    search = [],
    display = [],
    select = () => { },
    noResults = () => { },
    placeholder,
    label,
    showLabel = true,
    name,
    disabled = false,
    required = false,
    readOnly = false,
    wrapperClass,
    labelClass,
    inputClass,
    helperClass,
    helperText,
    showHelperText = true,
    ...props
}) => {
    const [searchValue, setSearchValue] = useState('')
    const [searchResults, setSearchResults] = useState(data)

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
    const handleSearch = (e) => {
        if (searchValue === '') {
            setSearchResults(data)
            return
        }
        const results = data.filter(item => {
            return search.some(key => {
                return item[key].toLowerCase().includes(searchValue.toLowerCase())
            })
        })
        setSearchResults(results)
        console.log(results)
        return
    }

    return (
        <div
            className={[
                'relative flex flex-col max-w-[80%] min-w-[300px]',
                wrapperClass,
                disabled && 'opacity-50',
            ].join(' ')}
        >
            {/* Input Label */}
            {showLabel && label &&
                <label
                    className={[
                        'text-sm mb-1 ml-1',
                        labelClass,
                    ].join(' ')}
                    htmlFor={name}
                >
                    {label}
                </label>
            }
            {/* Search Bar */}
            <input
                className={[
                    'w-full px-3 py-2 rounded',
                    'outline-none transition-all',
                    'text-base',
                    inputStatus,
                    disabled && 'cursor-not-allowed',
                    inputClass,
                ].join(' ')}
                type='text'
                placeholder={placeholder}
                value={searchValue}
                onChange={(e) => {
                    setSearchValue(e.target.value)
                }}
                onKeyUp={handleSearch}
                name={name}
                required={required}
                readOnly={readOnly}
                disabled={disabled}
            />
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
            {/* Search Results */}
            {
                searchValue.length > 0 && (
                    <div className="flex flex-col absolute bg-white w-full h-[200px] rounded z-10 top-full p-3 overflow-y-scroll border-2 shadow">
                        {
                            searchResults.length > 0 && searchResults.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className='flex items-center justify-between p-2 w-full font-medium hover:bg-primary-100 rounded cursor-pointer'
                                        onClick={() => {
                                            select(item)
                                            setSearchValue('')
                                            setSearchResults(data)
                                        }}
                                    >
                                        {
                                            display.map((key, index) => {
                                                return (
                                                    <span
                                                        key={index}
                                                    >
                                                        {item[key]}
                                                    </span>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                        {
                            searchResults.length === 0 && (
                                <div
                                    className='flex items-center justify-center p-2 w-full font-medium rounded hover:bg-primary-100 cursor-pointer'
                                    onClick={() => {
                                        noResults()
                                        setSearchValue('')
                                        setSearchResults(data)
                                    }}
                                >
                                    No Results Found! Click to Add New.
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

export default SearchSelect