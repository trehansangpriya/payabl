import React, { useState } from 'react'
import { Button, Container, Loading } from '@/Components/utility'
import { publicRoute } from '@/Routes/publicRoute'
import { FaGoogle } from 'react-icons/fa';
import useGlobals from '@/Contexts/useGlobals';
import useAuth from '@/Contexts/useAuth';

const Login = () => {
    // Sign in with Google function from Firebase
    const { signInWithGoogle } = useAuth()

    // Display alert message (show,variant,message)
    const { displayAlert } = useGlobals()

    // Local Loading state
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
                'md:flex-row'
            ].join(' ')}
        >
            {/* md: Left Sm: Top */}
            <Container
                id="logo-wrapper"
                className={[
                    'w-full h-[40%]',
                    'md:h-full',
                    'flex justify-start items-center',
                ].join(' ')}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src='/assets/images/logo.png'
                    alt='Payabl'
                />
            </Container>
            {/* md: Right Sm: Bottom */}
            <Container
                id="login-wrapper"
                className={[
                    'w-full h-full p-4',
                    'md:h-full',
                    'flex flex-col gap-3 justify-center',
                ].join(' ')}
            >
                <h1
                    className={[
                        'font-bold text-6xl'
                    ].join(' ')}
                >
                    Payabl
                </h1>
                <h2
                    className='font-medium text-2xl'
                >
                    Take control of your money.
                </h2>
                <Button
                    className='w-full md:w-fit'
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