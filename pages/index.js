import React from 'react'
import { Button, Container } from '@/Components/utility'
import { privateRoute } from '@/Routes/privateRoute'
import { FiLogOut } from 'react-icons/fi'

const Home = ({ auth }) => {
  const { user, userData, logOut } = auth

  return (
    <Container
      gap={'16px'}
      padding='12px'
      minHeight='100vh'
    >
      <h1>
        Home
      </h1>
      {user && userData && `Welcome, ${userData?.displayName}`}
      {user &&
        <Button
          color='error'
          iconLeft={<FiLogOut />}
          onClick={logOut}
        >
          Log Out
        </Button>}
      <Button
        color='primary'
        onClick={() => setToggleModal(true)}
      >
        Open Modal
      </Button>
    </Container>
  )
}

export default privateRoute(Home)