import React, { useState } from 'react'
import { Button, Container, Loading, Text } from '@/Components/utility'
import { publicRoute } from '@/Routes/publicRoute'
import { FaGoogle } from 'react-icons/fa';
import useGlobals from '@/Contexts/useGlobals';
import Image from 'next/image';

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
            id='login-screen'
            className={[
                'h-screen flex flex-col justify-start',
                'lg:flex-row'
            ].join(' ')}
        >
            {/* Lg: Left Sm: Top */}
            <Container
                id="logo-wrapper"
                className={[
                    'w-full h-[40%]',
                    'flex justify-start items-center',
                ].join(' ')}
            >
                <Image
                    src='/assets/images/logo.png'
                    alt='Payabl'
                    width={360}
                    height={360}
                />
            </Container>
            {/* Lg: Right Sm: Bottom */}
            <Container
                id="login-wrapper"
                className={[
                    'w-full h-full p-4',
                    'flex flex-col gap-6 justify-center'
                ].join(' ')}
            >
                <Text
                    // tag='h1'
                    className='text-6xl'
                >
                    Payabl
                </Text>
                <Button
                    // className='w-full'
                    iconLeft={<FaGoogle />}
                    onClick={handleSignIn}
                    disabled={loading}
                >Sign In With Google</Button>
            </Container>
            {/* Sign In Loading */}
            {
                loading && <Loading modal message='Waiting for you to sign in with Google...' />
            }
        </Container>
    )
}

export default publicRoute(Login)