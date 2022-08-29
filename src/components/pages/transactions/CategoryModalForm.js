import React, { useEffect, useState } from 'react'
import { Button, Card, Form, Input, Modal, Pill } from '@/Components/utility'
// import Picker from 'emoji-picker-react'
import dynamic from 'next/dynamic';
import { FiLoader, FiSmile, FiXCircle } from 'react-icons/fi'
import useValidation from '@/Hooks/useValidation'
import useGlobals from '@/Contexts/useGlobals';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/Firebase/index';
import useAuth from '@/Contexts/useAuth';
const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

const CategoryModalForm = ({
    isOpen,
    onClose,
    title,
    text,
}) => {
    // Auth Context
    const { user } = useAuth()
    // Global Context
    const { displayAlert } = useGlobals()

    // Local Loading State
    const [loading, setLoading] = useState(false)

    // useValidation Hook
    const { checkEmpty } = useValidation()

    const [categoryName, setCategoryName] = useState('')
    const [categoryEmoji, setCategoryEmoji] = useState('')
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)

    useEffect(() => {
        if (text) {
            setCategoryName(text)
        }
    }, [text])

    const handleAddCategory = (e) => {
        console.log('add category')
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
            addDoc(collection(db, 'users', user.uid, 'categories'), {
                name: categoryName,
                emoji: categoryEmoji,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            }).then(() => {
                // clear form
                setCategoryName('')
                setCategoryEmoji('')
                setShowEmojiPicker(false)
                // close modal
                setLoading(false)
                onClose()
                displayAlert(true, 'success', 'New category added')
            }).catch(err => {
                setLoading(false)
                displayAlert(true, 'error', err.message)
            })
        }
    }
    return (
        <Modal
            onClose={() => {
                setCategoryEmoji('')
                setShowEmojiPicker(false)
                setCategoryName('')
                setLoading(false)
                onClose()
            }}
            title={title}
            isOpen={isOpen}
        >
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
                    onClick={handleAddCategory}
                    iconLeft={loading && <FiLoader size={18} className='animate-spin' />}
                >
                    {
                        !loading && 'Add Category'
                    }

                </Button>
            </div>
        </Modal>
    )
}

export default CategoryModalForm