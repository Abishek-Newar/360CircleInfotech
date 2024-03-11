import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import BottomTabNavigator from './bottom-tab-navigator';
const Stack = createNativeStackNavigator();
const AppStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name='root' component={BottomTabNavigator} options={{
            headerShown: false,
        }} />
    </Stack.Navigator>
  )
}

export default AppStack