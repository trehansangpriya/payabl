import React, { useEffect, useState } from 'react'
import { PageScreen } from '@/Components/app'
import { privateRoute } from '@/Routes/privateRoute'
import useAuth from '@/Contexts/useAuth'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '@/Firebase/index'
import { CategoryAddForm, ViewAllCategories } from '@/Components/pages/profile'
import { Modal } from '@/Components/utility'
import { FiPlus } from 'react-icons/fi'

const Categories = () => {
    const { user } = useAuth()

    const [categories, setCategories] = useState([])
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false)

    useEffect(() => {
        onSnapshot(collection(db, 'users', user.uid, 'categories'), (snapshot) => {
            setCategories(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })))
        })
    }, [user.uid])

    return (
        <PageScreen
            title={'Categories'}
            className={'px-4 py-5'}
            actions={(
                <div
                    className='text-layout-600 bg-layout-200 font-medium transition-all p-2 hover:bg-primary-50 hover:text-primary-700 cursor-pointer rounded-full'
                    onClick={() => setShowAddCategoryModal(true)}
                >
                    <FiPlus size={18} />
                </div>
            )}
        >
            <ViewAllCategories categories={categories} />
            <Modal isOpen={showAddCategoryModal} onClose={() => setShowAddCategoryModal(false)} title={'Add new category'}>
                <CategoryAddForm afterSubmitActions={() => setShowAddCategoryModal(false)} />
            </Modal>
        </PageScreen>
    )
}

export default privateRoute(Categories)