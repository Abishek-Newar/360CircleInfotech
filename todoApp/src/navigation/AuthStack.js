import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import WelcomeScreen from '../screens/welcome-screen';
import SignIN from '../screens/Signin';
import SignUp from '../screens/signup';
import RecoveryEmail from '../screens/RecoveryEmail/RecoveryEmail';
import Otps from '../screens/OtpPage/Otps';
import ConfirmScreen from '../screens/confirmScreen';
const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen  name='Welcome' component={WelcomeScreen} options={{headerShown: false,}} />
        <Stack.Screen name='SignIn' component={SignIN} options={{headerShown: false,}} />
        <Stack.Screen name='SignUp' component={SignUp} options={{headerShown: false,}} />
        <Stack.Screen name='Recover' component={RecoveryEmail} options={{headerShown: false,}} />
        <Stack.Screen name='otps' component={Otps} options={{headerShown: false,}} />
        <Stack.Screen name='confirm' component={ConfirmScreen} options={{headerShown: false,}} />
    </Stack.Navigator>
  )
}

export default AuthStack