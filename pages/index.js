import React from 'react'
import { Container } from '@/Components/utility'
import { privateRoute } from '@/Routes/privateRoute'
import useGlobals from '@/Contexts/useGlobals';
const Home = ({ auth }) => {
  const { user, userData, logOut } = auth
  const { displayAlert } = useGlobals()
  return (
    <div>
      <Container
        gap={'16px'}
      >
        Home
        {user && <button onClick={logOut}>Log Out</button>}
        {user && userData && `Welcome, ${userData?.displayName}`}
        <button
          onClick={() => displayAlert(true, 'error', 'Hello')}
        >
          Show Alert
        </button>
      </Container>
    </div>
  )
}

export default privateRoute(Home)