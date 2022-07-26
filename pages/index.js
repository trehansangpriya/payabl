import React from 'react'
import { Button, Container, Text } from '@/Components/utility'
import { privateRoute } from '@/Routes/privateRoute'
import { FiLogOut } from 'react-icons/fi'
import { AppTopBar, FAB } from '@/Components/app'

const Home = ({ auth }) => {
  const { user, userData, logOut } = auth

  return (
    <Container
      gap={'16px'}
      padding='12px'
      minHeight='100vh'
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