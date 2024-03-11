import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect } from 'react'
import AuthStack from './AuthStack'
import AppStack from './AppStack'
import useUserGlobalStore from '../store/useUserGlobalStore'

const Navigation = () => {
    const {user } = useUserGlobalStore()
 
  return (
    <NavigationContainer>
        {
            user?
            <AppStack />:
            <AuthStack />
        }
    </NavigationContainer>
  )
}

export default Navigation