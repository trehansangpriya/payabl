import React from 'react';
import useAuth from '@/Contexts/useAuth';
import { useRouter } from 'next/router';

export function publicRoute(Component) {
    return function PublicRoute(props) {
        const auth = useAuth()
        const router = useRouter()
        if (auth.user) {
            router.push('/')
            return 'Loading...'
        }
        return <Component auth={auth} {...props} />
    }
}