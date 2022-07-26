import React from 'react'
import { AppTopBar, BottomBar } from '@/Components/app'
import { Container } from '@/Components/utility'

const AppScreen = ({
    children,
    className,
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
            <AppTopBar />
            {children}
            <BottomBar />
        </Container>
    )
}

export default AppScreen