import React, { useEffect, useState } from 'react'
import { Button, Pill, Seperator, Spacer, Modal } from '@/Components/utility'
import { accountPillColors } from '@/Data/accountTypes'
import Image from 'next/image'
import { FiEdit2, FiTrash } from 'react-icons/fi'
import { TransactionCard, TransactionSkeleton } from '@/Components/pages/transactions'
import EditAccountForm from './EditAccountForm'
import { useRouter } from 'next/router'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/Firebase/index'
import useAuth from '@/Contexts/useAuth'
import useGlobals from '@/Contexts/useGlobals'
import { NotFound } from '@/Components/app'


const ViewAccount = ({
    accountData,
    transactions,
    categories,
    balance
}) => {
    const router = useRouter()
    const { user } = useAuth()
    const { displayAlert } = useGlobals()
    const [accountID, setAccountID] = useState(accountData.id)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    useEffect(() => {
        setAccountID(accountData.id)
    }, [accountData])
    const handleDelete = () => {
        transactions.find((transaction) => {
            if (transaction.transactionAccountID === accountID) {
                deleteDoc(doc(db, 'users', user.uid, 'transactions', transaction.id))
            }
        })
        deleteDoc(doc(db, 'users', user.uid, 'accounts', accountID))
            .then(() => {
                displayAlert(true, 'success', 'Account deleted successfully')
            })
        router.push('/accounts')
    }
    return (
        <div className={'flex flex-col gap-2'}>
            <div className="flex justify-between items-start">
                <div className={'flex flex-col gap-2 w-[75%]'}>
                    <h1 className={'font-semibold text-2xl whitespace-nowrap overflow-x-scroll'}>{accountData.accountName}</h1>
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
                    >
                        {accountData.accountType}
                    </Pill>
                </div>
                <div className={'flex items-center justify-end gap-1 w-[25%]'}>
                    <Button color='info' circle onClick={() => setShowEditModal(true)}>
                        <FiEdit2 size={14} />
                    </Button>
                    <Button color='error' circle onClick={() => setShowDeleteModal(true)}>
                        <FiTrash size={14} />
                    </Button>
                </div>
            </div>
            <div className='text-sm text-layout-500'>
                {accountData.accountDescription}
            </div>
            <h2 className='flex flex-col'>
                {
                    accountData.accountType === 'Credit Card'
                        ? <span>Credit Left</span>
                        : <span>Balance</span>
                }
                <span className='text-3xl font-semibold'>
                    ₹{balance?.toFixed(2)}
                </span>
            </h2>
            <Spacer h={'8px'} />
            {
                transactions.length > 0
                    ? (
                        <div className="flex flex-col gap-1 w-full">
                            <Seperator text={'Transactions'} />
                            {
                                transactions.sort((a, b) =>
                                    a.transactionDate.toDate() > b.transactionDate.toDate() ? -1 : 1
                                ).map((transaction) => (
                                    <div
                                        key={transaction.id}
                                    >
                                        <TransactionCard
                                            txn={transaction}
                                            account={accountData}
                                            category={categories.find((category) => category.id === transaction.transactionCategoryID)}
                                            showAccount={false}
                                        />
                                        <Seperator className='mt-1' />
                                    </div>
                                ))
                            }
                        </div>
                    )
                    :
                    <>
                        <Seperator />
                        <NotFound message={'No Transactions Found'} />
                    </>
            }
            {/* Edit Modal */}
            <Modal title='Edit Account' isOpen={showEditModal} onClose={() => setShowEditModal(false)} >
                <EditAccountForm afterSubmitActions={() => setShowEditModal(false)} account={{
                    id: accountData.id,
                    name: accountData.accountName,
                    description: accountData.accountDescription,
                }} />
            </Modal>
            {/* Delete Modal */}
            <Modal title='Delete Account' isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} >
                <div className={'text-center flex flex-col gap-3'}>
                    <p>
                        Are you sure you want to delete this account and all its transactions?
                    </p>
                    <div className={'flex justify-between lg:justify-center gap-2'}>
                        <Button className={'w-full'} onClick={() => setShowDeleteModal(false)}>
                            Cancel
                        </Button>
                        <Button className={'w-full'} color='error' onClick={handleDelete}>
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ViewAccount

export const ViewAccountSkeleton = () => {
    return (
        <div className={'flex flex-col gap-3'}>
            <div className="flex justify-between items-center">
                <div className={'flex items-center gap-2'}>
                    <h1 className={'font-semibold text-2xl h-8 w-[150px] bg-layout-300 rounded-full animate-pulse'}></h1>
                    <Pill
                        size='18px'
                        className={'h-8 w-[80px] bg-layout-300 rounded-full animate-pulse'}
                    >
                    </Pill>
                </div>
                <div className={'flex items-center gap-1'}>
                    <div className="h-8 w-8 bg-layout-300 rounded-full animate-pulse"></div>
                    <div className="h-8 w-8 bg-layout-300 rounded-full animate-pulse"></div>
                </div>
            </div>
            <div className='text-sm text-layout-500 h-5 w-[200px] bg-layout-300 rounded-full animate-pulse'>

            </div>
            <h2 className='flex flex-col gap-1'>
                <div className='h-4 w-[50px] bg-layout-300 rounded-full animate-pulse'></div>
                <div className='text-3xl font-semibold h-9 w-[120px] bg-layout-300 rounded-full animate-pulse'>

                </div>
            </h2>
            <Spacer h={'8px'} />
            <div className="flex flex-col gap-1 w-full">
                <Seperator text={<div className='h-[20px] w-[180px] bg-layout-300 animate-pulse rounded-full'></div>} />
                <TransactionSkeleton />
            </div>
        </div>
    )
}