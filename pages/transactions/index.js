import { AppScreen, FAB } from '@/Components/app'
import { ViewAllTransactions } from '@/Components/pages/transactions'
import useAuth from '@/Contexts/useAuth'
import { privateRoute } from '@/Routes/privateRoute'
import { collection, onSnapshot } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { db } from '@/Firebase/index';
import Image from 'next/image'
import { FiCheck, FiFilter, FiX } from 'react-icons/fi'
import { Pill } from '@/Components/utility'

const Transactions = () => {
    const { user } = useAuth()
    const router = useRouter()
    // All Transactions
    const [transactions, setTransactions] = useState([])
    // All Accounts
    const [accounts, setAccounts] = useState([])
    // All Categories
    const [categories, setCategories] = useState([])
    // Local Loading
    const [loading, setLoading] = useState(false)
    // filter
    const [filters, setFilters] = useState({
        transactionAccountID: '',
        transactionCategoryID: '',
    })

    // show Account Filter
    const [showAccountFilter, setShowAccountFilter] = useState(false)
    // show Category Filter
    const [showCategoryFilter, setShowCategoryFilter] = useState(false)


    // Filtered Transactions
    const [filteredTransactions, setFilteredTransactions] = useState([])

    useEffect(() => {
        setLoading(true)
        onSnapshot(collection(db, 'users', user.uid, 'transactions'), (snapshot) => {
            setTransactions(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })))
        })
        onSnapshot(collection(db, 'users', user.uid, 'accounts'), (snapshot) => {
            setAccounts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        })
        onSnapshot(collection(db, 'users', user.uid, 'categories'), (snapshot) => {
            setCategories(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        })
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [user.uid])

    useEffect(() => {
        if (filters.transactionAccountID !== '' && filters.transactionCategoryID !== '') {
            setFilteredTransactions(transactions.filter(transaction => transaction.transactionAccountID === filters.transactionAccountID && transaction.transactionCategoryID === filters.transactionCategoryID))
        }
        else if (filters.transactionAccountID !== '') {
            setFilteredTransactions(transactions.filter(transaction => transaction.transactionAccountID === filters.transactionAccountID))
        }
        else if (filters.transactionCategoryID !== '') {
            setFilteredTransactions(transactions.filter(transaction => transaction.transactionCategoryID === filters.transactionCategoryID))
        }
        else {
            setFilteredTransactions(transactions)
        }
    }, [filters, transactions])
    return (
        <AppScreen title={'Transactions'}>
            <div className="flex justify-between items-center">
                {/* Filters */}
                <div className="flex gap-2 pt-2 px-1">
                    {/* Account Filter */}
                    <div className="flex relative">
                        <div className="flex cursor-pointer border border-layout-200 rounded" id="trigger" onClick={() => {
                            setShowAccountFilter(!showAccountFilter)
                        }}>
                            {
                                filters.transactionAccountID === '' ? (
                                    <div className='select-none py-1 px-2 '>
                                        <span className='flex justify-center items-center gap-1'>
                                            <FiFilter />
                                            Accounts
                                        </span>
                                    </div>
                                ) : (
                                    <div className='select-none py-1 px-2 bg-primary-50 text-primary-700 font-medium rounded'>
                                        <div className="flex gap-1 items-center">
                                            <div className='flex justify-center items-center'>
                                                <Image
                                                    src={`/assets/icons/accountTypes/${accounts.find(account => account.id === filters.transactionAccountID).accountType?.replace(/\s/g, '').toLowerCase()}.png`}
                                                    width={20}
                                                    height={20}
                                                    alt={accounts.find(account => account.id === filters.transactionAccountID).accountType}
                                                />
                                            </div>
                                            <span>
                                                {accounts.find(account => account.id === filters.transactionAccountID).accountName}
                                            </span>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        {
                            showAccountFilter &&
                            <div className="absolute bg-white w-fit h-[200px] overflow-y-scroll p-2 top-full mt-1 flex flex-col z-50 rounded">
                                <div className={[
                                    'flex px-2 py-1 rounded justify-between cursor-pointer gap-3',
                                    'hover:bg-layout-100',
                                ].join(' ')} key={'all'} onClick={() => {
                                    setFilters({ ...filters, transactionAccountID: '' })
                                    setShowAccountFilter(false)
                                }}
                                >
                                    <div className="flex items-center gap-1" >
                                        <span className='whitespace-nowrap'>
                                            All Accounts
                                        </span>
                                    </div>
                                    {filters.transactionAccountID === '' && (
                                        <div className="flex justify-center items-center">
                                            <FiCheck className='text-primary-500' />
                                        </div>
                                    )}
                                </div>
                                {
                                    accounts.map(account => (
                                        <div className={[
                                            'flex px-2 py-1 rounded justify-between cursor-pointer gap-3',
                                            'hover:bg-layout-100',
                                        ].join(' ')} key={account.id}
                                            onClick={() => {
                                                setFilters({ ...filters, transactionAccountID: account.id })
                                                setShowAccountFilter(false)
                                            }}
                                        >
                                            <div className="flex items-center gap-1" >
                                                <div className='flex justify-center items-center'>
                                                    <Image
                                                        src={`/assets/icons/accountTypes/${account.accountType?.replace(/\s/g, '').toLowerCase()}.png`}
                                                        width={20}
                                                        height={20}
                                                        alt={account.accountType}
                                                    />
                                                </div>
                                                <span className='whitespace-nowrap'>
                                                    {account.accountName}
                                                </span>
                                            </div>
                                            {filters.transactionAccountID === account.id && (
                                                <div className="flex justify-center items-center">
                                                    <FiCheck className='text-primary-500' />
                                                </div>
                                            )}
                                        </div>
                                    ))
                                }
                            </div>
                        }
                    </div>
                    {/* Category Filter */}
                    <div className="flex relative">
                        <div className="flex cursor-pointer border border-layout-200 rounded " id="trigger" onClick={() => {
                            setShowCategoryFilter(!showCategoryFilter)
                        }}>
                            {
                                filters.transactionCategoryID === '' ?
                                    (
                                        <div className='select-none py-1 px-2'>
                                            <span className='flex justify-center items-center gap-1'>
                                                <FiFilter />
                                                Categories
                                            </span>
                                        </div>
                                    ) : (
                                        <div className='select-none py-1 px-2 bg-primary-50 text-primary-700 font-medium rounded'>
                                            <div className="flex gap-1 items-center">
                                                <div className='flex justify-center items-center gap-1'>
                                                    <span>
                                                        {categories.find(category => category.id === filters.transactionCategoryID).emoji}
                                                    </span>
                                                    <span>
                                                        {categories.find(category => category.id === filters.transactionCategoryID).name}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                            }
                        </div>
                        {
                            showCategoryFilter && (
                                <div className="absolute bg-white w-fit h-[200px] overflow-y-scroll p-2 top-full mt-1 flex flex-col z-50 rounded">
                                    <div className={[
                                        'flex px-2 py-1 rounded justify-between cursor-pointer gap-3',
                                        'hover:bg-layout-100',
                                    ].join(' ')} key={'all'} onClick={() => {
                                        setFilters({ ...filters, transactionCategoryID: '' })
                                        setShowCategoryFilter(false)
                                    }
                                    }
                                    >
                                        <div className="flex items-center gap-1" >
                                            <span className='whitespace-nowrap'>
                                                All Categories
                                            </span>
                                        </div>
                                        {filters.transactionCategoryID === '' && (
                                            <div className="flex justify-center items-center">
                                                <FiCheck className='text-primary-500' />
                                            </div>
                                        )}
                                    </div>
                                    {
                                        categories.sort(
                                            // sort alphabetically 
                                            (a, b) => a.name.localeCompare(b.name)
                                        ).map(category => (
                                            <div className={[
                                                'flex px-2 py-1 rounded justify-between cursor-pointer gap-3',
                                                'hover:bg-layout-100',
                                            ].join(' ')} key={category.id}
                                                onClick={() => {
                                                    setFilters({ ...filters, transactionCategoryID: category.id })
                                                    setShowCategoryFilter(false)
                                                }
                                                }
                                            >
                                                <div className="flex items-center gap-1" >
                                                    <div className='flex justify-center items-center gap-1'>
                                                        <span>
                                                            {category.emoji}
                                                        </span>
                                                        <span>
                                                            {category.name}
                                                        </span>
                                                    </div>
                                                </div>
                                                {filters.transactionCategoryID === category.id && (
                                                    <div className="flex justify-center items-center">
                                                        <FiCheck className='text-primary-500' />
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                    {/* Clear Filters */}
                </div>
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

            {/* Filter Report */}


            {/* Transaction List */}
            <ViewAllTransactions
                transactions={filteredTransactions}
                accounts={accounts}
                categories={categories}
                loading={loading}
            />
            {/* FAB to add a new transaction */}
            <FAB
                label={'Add Transaction'}
                onClick={() => router.push('/transactions/add')}
            />
        </AppScreen>
    )
}

export default privateRoute(Transactions)