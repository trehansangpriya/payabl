import { Button } from '@/Components/utility'
import { publicRoute } from '@/Routes/publicRoute'
import React from 'react'
import { FaGoogle } from 'react-icons/fa';

const Login = ({ auth }) => {
    const { signInWithGoogle } = auth
    return (
        <div>
            <Button
                iconLeft={<FaGoogle />}
                onClick={signInWithGoogle}
            >Sign In With Google</Button>
        </div>
    )
}

export default publicRoute(Login)