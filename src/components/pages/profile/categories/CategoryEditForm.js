import React, { useEffect, useState } from 'react'
import { Button, Input, Modal, Pill } from '@/Components/utility'
// import Picker from 'emoji-picker-react'
import dynamic from 'next/dynamic';
import { FiLoader, FiSmile, FiXCircle } from 'react-icons/fi'
import useGlobals from '@/Contexts/useGlobals';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '@/Firebase/index';
import useAuth from '@/Contexts/useAuth';
const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

const CategoryEditForm = ({
    category,
    afterSubmitActions = () => { },
}) => {
    // Auth Context
    const { user } = useAuth()
    // Global Context
    const { displayAlert } = useGlobals()

    // Local Loading State
    const [loading, setLoading] = useState(false)


    const [categoryName, setCategoryName] = useState(category.name)
    const [categoryEmoji, setCategoryEmoji] = useState(category.emoji)

    const [showEmojiPicker, setShowEmojiPicker] = useState(false)

    const handleEditCategory = (e) => {
        console.log('edit category')
        // check empty fields
        if (categoryName === '') {
            displayAlert(true, 'error', 'Category name is required')
            return
        } else if (categoryEmoji === '') {
            displayAlert(true, 'error', 'Category emoji is required')
            return
        } else {
            setLoading(true)
            // add category
            setDoc(doc(db, 'users', user.uid, 'categories', category.id), {
                name: categoryName,
                emoji: categoryEmoji,
                updatedAt: serverTimestamp(),
            }, {
                merge: true
            }).then((doc) => {
                // clear form
                setCategoryName('')
                setCategoryEmoji('')
                setShowEmojiPicker(false)
                // close modal
                setLoading(false)
                afterSubmitActions()
                displayAlert(true, 'success', 'Category Edited')
            }).catch(err => {
                setLoading(false)
                displayAlert(true, 'error', err.message)
            })
        }
    }
    return (
        <div className='flex items-start justify-center gap-3 flex-col'>
            <div className="relative w-full">
                <div
                    className={' bg-white rounded cursor-pointer flex items-center py-2 px-3 h-[40px] gap-3'}
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                > {
                        categoryEmoji ? (
                            categoryEmoji
                        ) : (
                            <FiSmile className='text-layout-400' size={18} />
                        )
                    }
                    {
                        categoryEmoji ? (
                            <div className='flex gap-2 items-center '>
                                <span>Emoji Selected</span>
                                <Pill className={'cursor-pointer'} color='error' onClick={() => setCategoryEmoji('')}>Clear <FiXCircle /></Pill>
                            </div>
                        ) : <span className='text-layout-400'>Select an Emoji</span>
                    }
                </div>
                {
                    showEmojiPicker && (
                        <div className="flex justify-center mt-1">
                            <Picker
                                onEmojiClick={
                                    (event, emoji) => {
                                        setCategoryEmoji(emoji.emoji)
                                        setShowEmojiPicker(false)
                                    }
                                } />
                        </div>
                    )
                }
            </div>
            <Input
                id={'categoryName'}
                type={'text'}
                placeholder={'Enter Category Name'}
                name={'categoryName'}
                value={categoryName}
                onChange={(e) => {
                    setCategoryName(e.target.value)
                }}
                disabled={loading}
            />
            {/* </div> */}
            <Button
                disabled={loading}
                className='w-full'
                onClick={handleEditCategory}
                iconLeft={loading && <FiLoader size={18} className='animate-spin' />}
            >
                {
                    !loading && 'Edit Category'
                }

            </Button>
        </div>
    )
}

export default CategoryEditForm