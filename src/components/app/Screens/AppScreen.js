import React from 'react'
import { AppTopBar, BottomBar } from '@/Components/app'
import { Banner, Container, Link } from '@/Components/utility'
import useAuth from '@/Contexts/useAuth'
import Head from 'next/head'

const AppScreen = ({
    children,
    className,
    title,
}) => {
    const { userData } = useAuth()
    return (
        <Container
            id='appScreen'
            className={'lg:w-[40%] lg:border-2 h-screen w-full'}
        >
            <Head>
                <title>{title}</title>
            </Head>
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
                    'p-2 pb-[100px]',
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