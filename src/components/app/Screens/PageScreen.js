import { Container } from '@/Components/utility'
import React from 'react'
import { PageTopBar } from '@/Components/app/'
import Head from 'next/head'

const PageScreen = ({
    children,
    className,
    title,
    actions,
}) => {
    return (
        <Container
            id='pageScreen'
            className={'lg:w-[40%] relative lg:border-2 h-screen w-full'}
        >
            <Head>
                <title>{title}</title>
            </Head>
            <PageTopBar title={title} actions={actions} />
            <Container
                className={[
                    'flex flex-col gap-2 w-full h-[95vh]',
                    'p-2 pb-[64px]',
                    'relative',
                    'overflow-y-scroll',
                    className,
                ].join(' ')}
            >
                {children}
            </Container>
        </Container>
    )
}

export default PageScreen