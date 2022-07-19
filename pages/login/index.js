import { publicRoute } from '@/Routes/publicRoute'
import React from 'react'

const Login = ({ auth }) => {
    const { signInWithGoogle } = auth
    return (
        <div>
            <button
                onClick={signInWithGoogle}
            >Sign In With Google</button>
        </div>
    )
}

export default publicRoute(Login)