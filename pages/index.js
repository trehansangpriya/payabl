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
        padding='12px'
        minHeight='100vh'
      >
        <h1>
          Home
        </h1>
        {user && userData && `Welcome, ${userData?.displayName}`}
        {user && <button onClick={logOut}>Log Out</button>}
      </Container>
    </div>
  )
}

export default privateRoute(Home)