import React, { useEffect, useState } from 'react'
import { db } from '@/Firebase/index'
import { collection, onSnapshot } from 'firebase/firestore'
import useAuth from '@/Contexts/useAuth'
import AccountCard, { AccountSkeleton } from './AccountCard'
import { Container, Seperator } from '@/Components/utility'
import { NotFound } from '@/Components/app'
import AccountsSummary from './AccountsSummary'

const ViewAllAccounts = () => {
    // Local Loading
    const [loading, setLoading] = useState(false)
    // Auth Context
    const { user } = useAuth()
    const [accounts, setAccounts] = useState([])

    const accountTypes = [
        'Bank',
        'Physical Wallet',
        'Digital Wallet',
        'Credit Card',
    ]

    useEffect(() => {
        setLoading(true)
        onSnapshot(collection(db, 'users', user.uid, 'accounts'), (snapshot) => {
            setAccounts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
            setTimeout(() => {
                setLoading(false)
            }, 500)
        })
    }, [user.uid])
    return (
        <Container
            className='flex flex-col gap-1'
        >
            {loading ? <>
                <AccountSkeleton />
            </>
                :
                accounts.length === 0 ? <NotFound message='No accounts found' />
                    : (
                        <>
                            <AccountsSummary accounts={accounts} />
                            {/* Group by account type */}
                            {accountTypes.map((accountType, index) => (
                                <div key={index} className='mt-1'>
                                    {/* if no accounts of this type, don't show the heading */}
                                    {accounts.filter(account => account.accountType === accountType).length !== 0 &&
                                        (
                                            <>
                                                <h5 className='font-semibold text-2xl py-2'>
                                                    {accountType}s
                                                </h5>
                                            </>
                                        )
                                    }
                                    {accounts.filter(account => account.accountType === accountType).map((account, index) => (
                                        <div key={account.id}>
                                            <AccountCard account={account} />
                                            {
                                                index !== accounts.length - 1 && <Seperator className='mt-1' />
                                            }
                                        </div>
                                    ))}
                                </div>
                            )
                            )}
                            {/* {accounts.length !== 0 ? accounts.map((account, index) => (
                            <div key={account.id}>
                                <AccountCard account={account} />
                                {
                                    index !== accounts.length - 1 && <Seperator className='mt-1' />
                                }
                            </div>
                        ))
                            : <NotFound message='No accounts found' />} */}
                        </>
                    )}
        </Container>
    )
}

export default ViewAllAccounts