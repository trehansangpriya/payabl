import React from 'react'
import { Button, Container } from '@/Components/utility'
import { privateRoute } from '@/Routes/privateRoute'
import useGlobals from '@/Contexts/useGlobals';
import { FiLogOut } from 'react-icons/fi'

const Home = ({ auth }) => {
  const { user, userData, logOut } = auth
  const { displayAlert } = useGlobals()
  return (
    <div>
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
          // disabled={true}
          >
            Log Out
          </Button>}
      </Container>
    </div>
  )
}

export default privateRoute(Home)