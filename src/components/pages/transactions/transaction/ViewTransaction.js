import { Button, Modal, Pill, Spacer } from '@/Components/utility'
import useAuth from '@/Contexts/useAuth'
import useGlobals from '@/Contexts/useGlobals'
import dayjs from 'dayjs'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FiDownload, FiEdit2, FiLoader, FiTrash, FiUpload } from 'react-icons/fi'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/Firebase/index'
import EditTransactionForm from './EditTransactionForm'

const ViewTransaction = ({
    txn = {},
    accounts = [],
    categories = [],
}) => {
    const router = useRouter()
    const { user } = useAuth()
    const { displayAlert } = useGlobals()
    const [txnID, setTxnID] = useState(txn.id)

    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    useEffect(() => {
        setTxnID(txn.id)
    }, [txn])
    const handleDelete = () => {
        deleteDoc(doc(db, 'users', user.uid, 'transactions', txnID))
            .then(() => {
                displayAlert(true, 'success', 'Transaction deleted successfully')
            })
        router.push('/transactions')
    }

    return (
        <div className='flex flex-col gap-3 justify-center items-center h-[100%]'>
            <div className="flex flex-col gap-2 items-center">
                {
                    txn?.transactionType === 'Income' ? (
                        <FiDownload size={24} className={'text-green-600'} />
                    ) : (
                        <FiUpload size={24} className={'text-red-600'} />
                    )
                }
                <div className={[
                    'text-3xl font-semibold',
                    txn.transactionType === 'Income' ? 'text-success-600' : 'text-error-600'
                ].join(' ')}>
                    ₹{txn.transactionAmount}
                </div>
            </div>
            <div className="flex flex-col gap-2 items-center">
                <Pill
                    color='primary'
                    size='18px'
                    className='px-3'
                >
                    {txn.transactionTitle}
                </Pill>
                <div className="flex flex-col gap-1 items-center">
                    <span className='text-layout-600 text-sm'>
                        {txn.transactionNote}
                    </span>
                    <span className='text-layout-500 text-xs'>
                        {dayjs(txn?.transactionDate?.toDate()).format('DD MMM YYYY')}
                    </span>
                </div>
            </div>
            <div className="flex gap-2">
                <Pill
                    size='12px'
                    icon={
                        <Image
                            src={`/assets/icons/accountTypes/${accounts.find((account) => account.id === txn?.transactionAccountID)?.accountType?.replace(/\s/g, '').toLowerCase()}.png`}
                            width={20}
                            height={20}
                            alt={accounts.find((account) => account.id === txn?.transactionAccountID)?.accountType}
                        />
                    }
                >
                    {accounts.find((account) => account.id === txn?.transactionAccountID)?.accountName}
                </Pill>
                {
                    categories.find((category) => category.id === txn?.transactionCategoryID) && (
                        <Pill
                            size='12px'
                            icon={categories.find((category) => category.id === txn?.transactionCategoryID)?.emoji}
                        >
                            {categories.find((category) => category.id === txn?.transactionCategoryID)?.name}
                        </Pill>
                    )
                }
            </div>
            <Spacer h='24px' />
            <div className={'flex items-center gap-3'}>
                <Button color='info' circle onClick={() => setShowEditModal(true)}>
                    <FiEdit2 size={18} />
                </Button>
                <Button color='error' circle onClick={() => setShowDeleteModal(true)}>
                    <FiTrash size={18} />
                </Button>
            </div>
            {/* Edit Modal */}
            <Modal title='Edit Transaction' isOpen={showEditModal} onClose={() => setShowEditModal(false)} >
                <EditTransactionForm afterSubmitActions={() => setShowEditModal(false)}
                    transaction={txn}
                />
            </Modal>
            {/* Delete Modal */}
            <Modal title='Delete Transaction' isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} >
                <div className={'text-center flex flex-col gap-3'}>
                    <p>
                        Are you sure you want to transaction?
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

export default ViewTransaction

export const ViewTransactionSkeleton = () => {
    return (
        <div className='flex flex-col gap-3 justify-center items-center h-[100%] animate-pulse'>
            <div className="flex flex-col gap-2 items-center">
                <FiLoader size={24} className={'animate-spin text-layout-200'} />
                <div className={[
                    'text-3xl font-semibold',
                    'bg-layout-300 h-[36px] w-[100px] rounded-full'
                ].join(' ')}>
                </div>
            </div>
            <div className="flex flex-col gap-2 items-center">
                <Pill
                    size='18px'
                    className='px-3 h-[30px] w-[200px]'
                >
                </Pill>
                <div className="flex flex-col gap-1 items-center">
                    <span className='text-layout-600 text-sm bg-layout-300 h-[16px] w-[80px] rounded-full'>
                    </span>
                    <span className='text-layout-500 text-xs bg-layout-300 h-[14px] w-[180px] rounded-full'>
                    </span>
                </div>
            </div>
        </div>
    )
}