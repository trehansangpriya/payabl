import React, { useState } from 'react'
import { Button, Container, Loading } from '@/Components/utility'
import { publicRoute } from '@/Routes/publicRoute'
import { FaGoogle } from 'react-icons/fa';
import useGlobals from '@/Contexts/useGlobals';

const Login = ({ auth }) => {
    // Sign in with Google from Firebase
    const { signInWithGoogle } = auth

    // Display alert message (show,variant,message)
    const { displayAlert } = useGlobals()

    // Loading
    const [loading, setLoading] = useState(false)

    // Sign in with Google
    const handleSignIn = () => {
        setLoading(true)
        signInWithGoogle()
            .then(() => {
                setLoading(false)
                displayAlert(true, 'success', 'Successfully signed in with Google!')
            })
            .catch((error) => {
                setLoading(false)
                displayAlert(true, 'error', error.message)
            })
    }

    return (
        <Container
            minHeight='100vh'
        >
            <Button
                iconLeft={<FaGoogle />}
                onClick={handleSignIn}
                disabled={loading}
            >Sign In With Google</Button>
            {
                loading && <Loading inline message='Waiting for you to sign in with Google...' />
            }
        </Container>
    )
}

export default publicRoute(Login)