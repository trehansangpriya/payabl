import React, { useEffect, useState } from 'react'
import { Button, Modal, Pill } from '@/Components/utility'
import { FiEdit2, FiTrash } from 'react-icons/fi'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/Firebase/index'
import useAuth from '@/Contexts/useAuth'
import useGlobals from '@/Contexts/useGlobals'
import { CategoryEditForm } from '..'

const CategoryCard = ({
    category,
}) => {
    const { user } = useAuth()
    const { displayAlert } = useGlobals()

    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const [categoryID, setCategoryID] = useState(category.id)
    useEffect(() => {
        setCategoryID(category.id)
    }, [category])

    const handleDelete = () => {
        deleteDoc(doc(db, 'users', user.uid, 'categories', categoryID))
            .then(() => {
                displayAlert(true, 'success', 'Category deleted successfully')
            })
    }

    return (
        <div className='w-full p-2 rounded flex justify-between items-center mb-2'>
            <div className="flex gap-1">
                <span>
                    {category.emoji}
                </span>
                <span>
                    {category.name}
                </span>
            </div>
            <div className="flex gap-2">
                <Button color='info' circle onClick={() => setShowEditModal(true)}>
                    <FiEdit2 size={14} />
                </Button>
                <Button color='error' circle onClick={() => setShowDeleteModal(true)}>
                    <FiTrash size={14} />
                </Button>
            </div>
            {/* Edit Modal */}
            <Modal title='Edit Account' isOpen={showEditModal} onClose={() => setShowEditModal(false)} >
                <CategoryEditForm category={category} afterSubmitActions={() => {
                    setShowEditModal(false)
                }} />
            </Modal>
            {/* Delete Modal */}
            <Modal title='Delete Transaction' isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} >
                <div className={'text-center flex flex-col gap-3'}>
                    <p>
                        Are you sure you want to delete this category?
                    </p>
                    <Pill className={'self-center'}>
                        {category.emoji} {category.name}
                    </Pill>
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

export default CategoryCard