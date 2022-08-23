import { PageScreen } from '@/Components/app'
import { doc, onSnapshot } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { db } from '@/Firebase/index';
import useAuth from '@/Contexts/useAuth';
import { Pill } from '@/Components/utility';
import Image from 'next/image';
import { accountPillColors } from '@/Data/accountTypes';

const ViewAccout = () => {
    const { user } = useAuth()
    const router = useRouter()
    const { accountID } = router.query

    const [loading, setLoading] = useState(true)

    const [accountData, setAccountData] = useState({})

    console.log(accountID)
    useEffect(() => {
        onSnapshot(doc(db, 'users', user.uid, 'accounts', accountID), (doc) => {
            setAccountData(doc.data())
        })
        setLoading(false)
    }, [accountID, user.uid])
    return (
        <PageScreen
            title={`Account - ${accountData?.accountName}`}
            className={'px-4 py-5'}
        >
            {
                loading ? <div className={'text-center'}>Loading...</div> :
                    (
                        <div className={'flex flex-col gap-2'}>
                            <div className={'flex items-center gap-2'}>
                                <h5 className={'font-semibold text-2xl'}>{accountData.accountName}</h5>
                                <Pill
                                    size='18px'
                                    color={accountPillColors[accountData?.accountType]}
                                    icon={
                                        <Image
                                            src={`/assets/icons/accountTypes/${accountData?.accountType?.replace(/\s/g, '').toLowerCase()}.png`}
                                            width={20}
                                            height={20}
                                            alt={accountData.accountType}
                                        />
                                    }
                                >{accountData.accountType}</Pill>
                            </div>
                            <div className='text-sm text-layout-500'>
                                {accountData.accountDescription}
                            </div>
                        </div>
                    )
            }

        </PageScreen>
    )
}

export default ViewAccout