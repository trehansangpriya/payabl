import React from 'react'
import { Alert, Button, Card, Container, Loading } from '@/Components/utility'
import { privateRoute } from '@/Routes/privateRoute'
import useGlobals from '@/Contexts/useGlobals';
import { FiLogOut } from 'react-icons/fi'

const Home = ({ auth }) => {
  const { user, userData, logOut } = auth
  const { displayAlert } = useGlobals()
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
    </Container>
  )
}

export default privateRoute(Home)