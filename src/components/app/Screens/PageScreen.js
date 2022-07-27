import { Container } from '@/Components/utility'
import React from 'react'
import { PageTopBar } from '@/Components/app/'

const PageScreen = ({
    children,
    className,
    label,
}) => {
    return (
        <Container>
            <PageTopBar label={label} />
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