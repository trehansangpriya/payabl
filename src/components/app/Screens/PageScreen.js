import { Container } from '@/Components/utility'
import React from 'react'
import { PageTopBar } from '@/Components/app/'

const PageScreen = ({
    children,
    className,
    label,
}) => {
    return (
        <Container
            className={[
                'flex flex-col gap-2',
                'min-h-screen',
                'p-2 py-[64px]',
                'relative bg-layout-100',
                className,
            ].join(' ')}
        >
            <PageTopBar label={label} />
            {children}
        </Container>
    )
}

export default PageScreen