import React from 'react'
import { Text } from '@/Components/utility'
import { privateRoute } from '@/Routes/privateRoute'
import { AppScreen, FAB } from '@/Components/app'

const Home = () => {
  return (
    <AppScreen title={'Dashboard'}>
      <Text tag='h4'>
        Home
      </Text>
      <FAB
        label='Add'
      />
    </AppScreen>
  )
}

export default privateRoute(Home)