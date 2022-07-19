import { Spacer } from '@/Components/utility'
import { privateRoute } from '@/Routes/privateRoute'
import React from 'react'
const Home = ({ auth }) => {
  const { user, userData, logOut } = auth
  return (
    <div className='flex flex-col justify-center items-center gap-5'>
      Home
      {user && <button onClick={logOut}>Log Out</button>}
      <Spacer h='100px' />
      {user && userData && `Welcome, ${userData?.displayName}`}
    </div>
  )
}

export default privateRoute(Home)