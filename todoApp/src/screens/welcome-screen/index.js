import { useNavigation } from '@react-navigation/native';
import React from 'react';

import SafeAreaWrapper from '../../components/shared/safe-area-wrapper';
import { Box, Text } from '../../utils';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../../components/button';
const WelcomeScreen = () => {
  const navigation = useNavigation();
    const navigateToSignIn = () =>{
        navigation.navigate("SignIn")
    }
    const navigateToSignUp = () =>{
      navigation.navigate("SignUp")
  }
  return (
    <SafeAreaWrapper>
      <LinearGradient colors={["#ffffff","#fcecff","#f8daff","#fae2ff","#fae2ff","#ffffff"]} style={{flex: 1}}>
      <Box flex={1} justifyContent='center'>
        <Text textAlign='center' variant="textXl" fontWeight='700'> Let's Get Productive</Text>
        <Box mt="3.5" mx="10">
        <Button label="Start Your Journey" onPress={navigateToSignUp}></Button>
        </Box>
    </Box>
      </LinearGradient>
    
    </SafeAreaWrapper>
  )
}

export default WelcomeScreen