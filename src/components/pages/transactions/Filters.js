import { Dropdown, DropdownItem, DropdownMegaMenu, DropdownTrigger, Pill } from '@/Components/utility'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FiFilter, FiX } from 'react-icons/fi'

const Filters = ({
    accounts,
    categories,
    filters,
    setFilters,
}) => {
    const [showFilter, setShowFilter] = useState(false)
    const [selectedAccount, setSelectedAccount] = useState(filters.transactionAccountID)
    const [selectedCategory, setSelectedCategory] = useState(filters.transactionCategoryID)
    useEffect(() => {
        setSelectedAccount(filters.transactionAccountID)
        setSelectedCategory(filters.transactionCategoryID)
    }, [filters])
    return (
        <div className='flex gap-1 items-center'>
            <Dropdown type='modal'>
                <DropdownTrigger
                    containerClassName={[
                        'border border-layout-200 rounded-full',
                        (filters.transactionAccountID !== '' || filters.transactionCategoryID !== '') && 'bg-primary-50 text-primary-700 font-medium border-primary-50',
                    ].join(' ')}
                    iconPosition='right'
                    onClick={() => {
                        setShowFilter(!showFilter)
                    }}>
                    <FiFilter />
                </DropdownTrigger>
                <DropdownMegaMenu
                    show={showFilter}
                    setShow={setShowFilter}
                    categories={['Account', 'Category']}
                    components={[
                        <>
                            <DropdownItem
                                onClick={() => {
                                    setSelectedAccount('')
                                }}
                                selected={selectedAccount === ''}
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
                                            setSelectedAccount(account.id)
                                        }}
                                        selected={selectedAccount === account.id}
                                    >
                                        {account.accountName}
                                    </DropdownItem>
                                ))
                            }
                        </>
                        ,
                        <>
                            <DropdownItem
                                onClick={() => {
                                    setSelectedCategory('')
                                }}
                                selected={selectedCategory === ''}
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
                                            setSelectedCategory(category.id)
                                        }}
                                        selected={selectedCategory === category.id}
                                    >
                                        {category.name}
                                    </DropdownItem>
                                ))
                            }
                        </>
                    ]}
                    action={() => {
                        setFilters({
                            ...filters,
                            transactionAccountID: selectedAccount,
                            transactionCategoryID: selectedCategory,
                        })
                        setShowFilter(false)
                    }}
                />
            </Dropdown>
            {/* Clear Filters */}
            {/* show if any filters are applied */}
            {
                (filters.transactionAccountID !== '' || filters.transactionCategoryID !== '') && (
                    <Pill
                        size='12px'
                        color='error'
                        className='cursor-pointer font-medium'
                        onClick={() => {
                            setFilters({ ...filters, transactionAccountID: '', transactionCategoryID: '' })
                        }}
                    >
                        Clear <FiX />
                    </Pill>
                )
            }
        </div>
    )
}

export default Filters