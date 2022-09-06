import React, { useState } from 'react'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal } from '@/Components/utility'
import dayjs from 'dayjs'
import { FiCalendar, FiChevronDown, FiChevronUp } from 'react-icons/fi'

const DateFilter = ({
    filter,
    setFilter,
    onClick = () => { },
}) => {
    const today = dayjs()
    const { startDate, endDate } = filter
    const [showDropdown, setShowDropdown] = useState(false)

    const [customStartDate, setCustomStartDate] = useState(dayjs())
    const [customEndDate, setCustomEndDate] = useState(dayjs())

    const [showCustomDateModal, setShowCustomDateModal] = useState(false)

    const dropdownValues = [
        {
            label: 'Today',
            value: {
                startDate: dayjs(today).startOf('day'),
                endDate: dayjs(today).endOf('day'),
            },
        },
        {
            label: 'Yesterday',
            value: {
                startDate: dayjs(today).subtract(1, 'day').startOf('day'),
                endDate: dayjs(today).subtract(1, 'day').endOf('day'),
            },
        },
        {
            label: 'This Week',
            value: {
                startDate: dayjs(today).startOf('week'),
                endDate: dayjs(today).endOf('week'),
            },
        },
        {
            label: 'Last Week',
            value: {
                startDate: dayjs(today).subtract(1, 'week').startOf('week'),
                endDate: dayjs(today).subtract(1, 'week').endOf('week'),
            },
        },
        {
            label: 'This Month',
            value: {
                startDate: dayjs(today).startOf('month'),
                endDate: dayjs(today).endOf('month'),
            },
        },
        {
            label: 'Last Month',
            value: {
                startDate: dayjs(today).subtract(1, 'month').startOf('month'),
                endDate: dayjs(today).subtract(1, 'month').endOf('month'),
            },
        },
        {
            label: 'This Year',
            value: {
                startDate: dayjs(today).startOf('year'),
                endDate: dayjs(today).endOf('year'),
            },
        },
        {
            label: 'Last Year',
            value: {
                startDate: dayjs(today).subtract(1, 'year').startOf('year'),
                endDate: dayjs(today).subtract(1, 'year').endOf('year'),
            },
        },
        {
            label: 'Custom',
            value: {
                startDate: customStartDate,
                endDate: customEndDate,
            },
        }
    ]
    return (
        <>
            <Dropdown type='modal'>
                <DropdownTrigger
                    containerClassName='bg-primary-50 rounded-full text-primary-700 font-medium'
                    icon={<FiCalendar />}
                    onClick={() => {
                        setShowDropdown(!showDropdown)
                        onClick()
                    }}
                    className='gap-2 px-3'
                >
                    {/* show label based on value */}
                    {dropdownValues.map((item) => {
                        if (item.value.startDate.isSame(startDate) && item.value.endDate.isSame(endDate)) {
                            return item.label !== 'Custom' ? item.label : (
                                <>
                                    {customStartDate.format('MMM D')} - {customEndDate.format('MMM D')}
                                </>
                            )
                        }
                    })}
                    {/* <span>
                        {
                            showDropdown ? (
                                <FiChevronUp />
                            ) : (
                                <FiChevronDown />
                            )
                        }
                    </span> */}
                </DropdownTrigger>
                <DropdownMenu type='modal' show={showDropdown} setShow={setShowDropdown}>
                    {
                        dropdownValues.map((item, index) => {
                            if (item.label !== 'Custom') {
                                return (
                                    <DropdownItem
                                        key={index}
                                        onClick={() => {
                                            setFilter(item.value)
                                            setShowDropdown(false)
                                        }}
                                        selected={item.value.startDate.isSame(startDate) && item.value.endDate.isSame(endDate)}
                                    >
                                        {item.label}
                                    </DropdownItem>
                                )
                            } else {
                                return (
                                    <DropdownItem
                                        key={index}
                                        onClick={() => {
                                            setShowCustomDateModal(true)
                                            setShowDropdown(false)
                                        }}
                                        selected={item.value.startDate.isSame(startDate) && item.value.endDate.isSame(endDate)}
                                    >
                                        {item.label}
                                    </DropdownItem>
                                )
                            }
                        })
                    }
                </DropdownMenu>

            </Dropdown>

            <Modal title={'Custom Date Range'} isOpen={showCustomDateModal} onClose={() => {
                setShowCustomDateModal(false)
            }}
                className='flex-col gap-2'
            >
                <Input
                    label='Start Date'
                    type='date'
                    value={customStartDate.format('YYYY-MM-DD')}
                    onChange={(e) => {
                        setCustomStartDate(dayjs(e.target.value))
                    }}
                />
                <Input
                    label='End Date'
                    type='date'
                    value={customEndDate.format('YYYY-MM-DD')}
                    onChange={(e) => {
                        setCustomEndDate(dayjs(e.target.value))
                    }}
                />
                <Button
                    className={'w-full'}
                    onClick={() => {
                        setFilter({
                            startDate: customStartDate,
                            endDate: customEndDate,
                        })
                        setShowCustomDateModal(false)
                        setShowDropdown(false)
                    }}
                >
                    Apply
                </Button>
            </Modal>

        </>
    )
}

export default DateFilter