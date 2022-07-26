import React from 'react'
import { Button, Container, Text } from '@/Components/utility'
import { privateRoute } from '@/Routes/privateRoute'
import { FiLogOut } from 'react-icons/fi'
import { AppTopBar, FAB } from '@/Components/app'

const Home = ({ auth }) => {
  const { user, userData, logOut } = auth

  return (
    <Container
      className={[
        'flex flex-col gap-2',
        'min-h-screen',
        'p-2 py-[80px]',
      ].join(' ')}
    >
      <AppTopBar />
      <Text tag='h4'>
        Home
      </Text>
      {user && userData && (
        <Text>
          {`Welcome, ${userData?.displayName}`}
        </Text>
      )}
      {user &&
        <Button
          color='error'
          iconLeft={<FiLogOut />}
          onClick={logOut}
        >
          Log Out
        </Button>}
      <FAB
        label='Add'
      />
    </Container>
  )
}

export default privateRoute(Home)