import React from 'react';
import useAuth from '@/Contexts/useAuth';
import { useRouter } from 'next/router';

export function privateRoute(Component) {
    return function PrivateRoute(props) {
        const auth = useAuth()
        const router = useRouter()
        if (!auth.user) {
            router.push('/auth')
            return 'Loading...'
        }
        return <Component auth={auth} {...props} />
    }
}