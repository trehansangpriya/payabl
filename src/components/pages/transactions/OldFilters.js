import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Pill } from '@/Components/utility'
import Image from 'next/image'
import React, { useState } from 'react'
import { FiCheck, FiFilter, FiMoreVertical, FiX } from 'react-icons/fi'

const OldFilters = ({
    accounts,
    categories,
    filters,
    setFilters,
}) => {

    // show Account Filter
    const [showAccountFilter, setShowAccountFilter] = useState(false)
    // show Category Filter
    const [showCategoryFilter, setShowCategoryFilter] = useState(false)

    return (
        // Filters 
        <div className="flex justify-between items-center px-1">
            <div className="flex gap-1 items-center">
                {/* Account Filter */}
                <Dropdown>
                    <DropdownTrigger
                        containerClassName={[
                            'border border-layout-200 rounded-full',
                            filters.transactionAccountID !== '' && 'bg-primary-50 text-primary-700 font-medium',
                        ].join(' ')}
                        icon={
                            filters.transactionAccountID === ''
                                ? <FiFilter />
                                : (
                                    <Image
                                        src={`/assets/icons/accountTypes/${accounts.find(account => account.id === filters.transactionAccountID).accountType?.replace(/\s/g, '').toLowerCase()}.png`}
                                        width={20}
                                        height={20}
                                        alt={accounts.find(account => account.id === filters.transactionAccountID).accountType}
                                    />
                                )
                        }
                        onClick={() => {
                            setShowAccountFilter(!showAccountFilter)
                            setShowCategoryFilter(false)
                        }}>
                        {
                            filters.transactionAccountID === '' ? ('Accounts') : (accounts.find((account) => account.id === filters.transactionAccountID).accountName)
                        }
                    </DropdownTrigger>

                    <DropdownMenu show={showAccountFilter} setShow={setShowAccountFilter}>
                        <DropdownItem
                            onClick={() => {
                                setFilters({
                                    ...filters,
                                    transactionAccountID: '',
                                })
                                setShowAccountFilter(false)
                            }}
                            selected={filters.transactionAccountID === ''}
                        >
                            All
                        </DropdownItem>
                        {
                            accounts.map((account) => (
                                <DropdownItem
                                    key={account.id}
                                    icon={<Image
                                        src={`/assets/icons/accountTypes/${account.accountType?.replace(/\s/g, '').toLowerCase()}.png`}
                                        width={20}
                                        height={20}
                                        alt={account.accountType}
                                    />}
                                    onClick={() => {
                                        setFilters({
                                            ...filters,
                                            transactionAccountID: account.id,
                                        })
                                        setShowAccountFilter(false)
                                    }}
                                    selected={filters.transactionAccountID === account.id}
                                >
                                    {account.accountName}
                                </DropdownItem>
                            ))
                        }
                    </DropdownMenu>

                </Dropdown>

                {/* Category Filter */}
                <Dropdown>
                    <DropdownTrigger
                        containerClassName={[
                            'border border-layout-200 rounded-full',
                            filters.transactionCategoryID !== '' && 'bg-primary-50 text-primary-700 font-medium',
                        ].join(' ')}
                        icon={
                            filters.transactionCategoryID === ''
                                ? <FiFilter />
                                : (
                                    <span>
                                        {categories.find(category => category.id === filters.transactionCategoryID).emoji}
                                    </span>
                                )
                        }
                        onClick={() => {
                            setShowCategoryFilter(!showCategoryFilter)
                            setShowAccountFilter(false)
                        }}>
                        {
                            filters.transactionCategoryID === '' ? ('Categories') : (categories.find((category) => category.id === filters.transactionCategoryID).name)
                        }
                    </DropdownTrigger>
                    {
                        showCategoryFilter && (
                            <DropdownMenu>
                                <DropdownItem
                                    onClick={() => {
                                        setFilters({
                                            ...filters,
                                            transactionCategoryID: '',
                                        })
                                        setShowCategoryFilter(false)
                                    }}
                                    selected={filters.transactionCategoryID === ''}
                                >
                                    All
                                </DropdownItem>
                                {
                                    categories.sort(
                                        // sort alphabetically 
                                        (a, b) => a.name.localeCompare(b.name)
                                    ).map((category) => (
                                        <DropdownItem
                                            key={category.id}
                                            icon={category.emoji}
                                            onClick={() => {
                                                setFilters({
                                                    ...filters,
                                                    transactionCategoryID: category.id,
                                                })
                                                setShowCategoryFilter(false)
                                            }}
                                            selected={filters.transactionCategoryID === category.id}
                                        >
                                            {category.name}
                                        </DropdownItem>
                                    ))
                                }
                            </DropdownMenu>
                        )
                    }
                </Dropdown>
            </div>
            {/* Clear Filters */}
            {/* show if any filters are applied */}
            {
                (filters.transactionAccountID !== '' || filters.transactionCategoryID !== '') && (
                    <Pill
                        size='14px'
                        color='primary'
                        className='cursor-pointer'
                        onClick={() => {
                            setFilters({ ...filters, transactionAccountID: '', transactionCategoryID: '' })
                        }}
                    >
                        Clear All <FiX />
                    </Pill>
                )
            }
        </div>
    )
}

export default OldFilters