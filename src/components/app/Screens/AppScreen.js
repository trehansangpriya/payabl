import React from 'react'
import { AppTopBar, BottomBar } from '@/Components/app'
import { Banner, Container, Link } from '@/Components/utility'
import useAuth from '@/Contexts/useAuth'

const AppScreen = ({
    children,
    className,
}) => {
    const { userData } = useAuth()
    return (
        <Container
            id='appScreen'
        >
            {
                userData && !userData.profileComplete && (
                    <Banner
                        variant={'warn'}
                    >
                        <Link
                            className='text-inherit'
                            href='/profile'
                        >
                            Please complete your profile.
                        </Link>
                    </Banner>
                )
            }
            <AppTopBar />
            <Container
                className={[
                    'flex flex-col gap-2 w-full h-[85vh]',
                    'p-2 pb-[64px]',
                    'relative',
                    'overflow-y-scroll',
                    className,
                ].join(' ')}
            >
                {children}
            </Container>
            <BottomBar />
        </Container>
    )
}

export default AppScreen