import React, { useEffect, useState } from 'react'
import { db } from '@/Firebase/index'
import { collection, onSnapshot } from 'firebase/firestore'
import useAuth from '@/Contexts/useAuth'
import AccountCard, { AccountSkeleton } from './AccountCard'
import { Container, Loading, Seperator } from '@/Components/utility'

const ViewAllAccounts = () => {
    // Local Loading
    const [loading, setLoading] = useState(false)
    // Auth Context
    const { user } = useAuth()
    const [accounts, setAccounts] = useState([])
    useEffect(() => {
        setLoading(true)
        onSnapshot(collection(db, 'users', user.uid, 'accounts'), (snapshot) => {
            setAccounts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        })
    }, [user.uid])
    return (
        <Container
            className='flex flex-col gap-1'
        >
            {loading ? <>
                <AccountSkeleton />
            </>
                : (
                    accounts.map(account => (
                        <>
                            <AccountCard key={account.id} account={account} />
                            <Seperator />
                        </>
                    ))
                )}
        </Container>
    )
}

export default ViewAllAccounts