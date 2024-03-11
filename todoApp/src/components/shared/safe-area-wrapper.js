import React from 'react'
import theme, { Box, Text } from '../../utils'
import { SafeAreaView } from 'react-native-safe-area-context'

const SafeAreaWrapper = ({children}) => {
  return (
    <SafeAreaView style={{
        flex: 1,
        backgroundColor: theme.colors.white
    }}>
        {children}
    </SafeAreaView>
  )
}

export default SafeAreaWrapper