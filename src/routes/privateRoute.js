import React from 'react';
import useAuth from '@/Contexts/useAuth';
import { useRouter } from 'next/router';
import { Loading } from '@/Components/utility';

export function privateRoute(Component) {
    return function PrivateRoute(props) {
        const auth = useAuth()
        const router = useRouter()
        if (!auth.user) {
            router.push('/login')
            return <Loading />
        }
        return <Component auth={auth} {...props} />
    }
}