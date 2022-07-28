import { Container } from '@/Components/utility'
import React from 'react'
import { PageTopBar } from '@/Components/app/'
import Head from 'next/head'

const PageScreen = ({
    children,
    className,
    title,
}) => {
    return (
        <Container
            id='pageScreen'
        >
            <Head>
                <title>{title}</title>
            </Head>
            <PageTopBar title={title} />
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
        </Container>
    )
}

export default PageScreen