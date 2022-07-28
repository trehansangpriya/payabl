import React, { useState } from 'react'
import { Button, Form, Input, Loading, Progress } from '@/Components/utility'
import useAuth from '@/Contexts/useAuth'
import useGlobals from '@/Contexts/useGlobals'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '@/Firebase/index'
import { FiUploadCloud } from 'react-icons/fi'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '@/Firebase/index'


const ProfilePictureUpload = ({
    afterSubmitActions = () => { },
}) => {
    // Auth Context 
    const { user } = useAuth()

    // Global Context
    const { displayAlert } = useGlobals()

    // Local Loading State
    const [loading, setLoading] = useState(false)

    // Local Progress State
    const [progress, setProgress] = useState(0)

    // Image Upload State
    const [image, setImage] = useState(null)

    // Image Upload Handler
    const handleImageUpload = (e) => {
        setLoading(true)
        const fileName = user.displayName.split(' ')[0].toLowerCase()
        const profilePictureRef = ref(storage, `users/${fileName}.${image.type.split('/')[1]}`)
        const uploadProfilePicture = uploadBytesResumable(profilePictureRef, image)
        uploadProfilePicture.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            },
            (err) => {
                displayAlert(true, 'error', err.message)
            },
            () => {
                displayAlert(true, 'success', 'Uploaded')
                getDownloadURL(uploadProfilePicture.snapshot.ref)
                    .then((url) => {
                        setDoc(doc(db, 'users', user.uid), {
                            photoURL: url,
                            editedAt: serverTimestamp(),
                        }, { merge: true })
                            .then(() => {
                                displayAlert(true, 'success', 'Profile Picture Updated')
                                setLoading(false)
                                setImage(null)
                                afterSubmitActions()
                            })
                    })
            }
        )
    }
    return (
        <Form
            className='flex flex-col gap-3'
            onSubmit={handleImageUpload}>
            <Input
                type='file'
                accept="image/png, image/jpeg"
                name='profilePicture'
                id='profilePicture'
                onChange={(e) => {
                    console.log(e.target.files[0])
                    setImage(e.target.files[0])
                }}
                disabled={loading}
            />
            <Button type='submit' color='primary' className='lg:w-full' disabled={loading}>
                Upload
            </Button>
            {
                loading && (
                    <Progress
                        badge='Uploading Profile Picture'
                        badgeIcon={<FiUploadCloud />}
                        color='primary'
                        completeMessage='Uploaded'
                        infinite={true}
                    />
                )
            }

        </Form>
    )
}

export default ProfilePictureUpload