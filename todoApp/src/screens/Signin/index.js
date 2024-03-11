import React from 'react'
import { Box, Text } from '../../utils'

import { useNavigation } from '@react-navigation/native'
import SafeAreaWrapper from '../../components/shared/safe-area-wrapper'
import Inputs from '../../components/inputs'
import Button from '../../components/button'
import { Pressable } from 'react-native'
import { Controller, useController, useForm } from 'react-hook-form'
import { loginUser } from '../../services/api'
import useUserGlobalStore from '../../store/useUserGlobalStore'

const SignInScreen = () => {
  const navigation = useNavigation()
  const navigateToSignInScreen = () => {
    navigation.navigate("SignUp")
  }
  const navigateToRecover = () => {
    navigation.navigate("Recover")
  }

  const { updateUser } = useUserGlobalStore()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const onSubmit = async (data) => {
    try {
      const { email, password } = data
      const _user = await loginUser({
        email: email.toLowerCase(),
        password: password.toLowerCase(),
      })
      console.log(_user)
      updateUser({
        _user
      })
    } catch (error) {}
  }

  return (
    <SafeAreaWrapper>
      <Box flex={1} px="5.5" justifyContent="center">
        <Text variant="textXl" fontWeight="700">
          Welcome Back
        </Text>
        <Box mb="6" />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Inputs
              label="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Email"
              error={errors.email}
            />
          )}
          name="email"
        />
        <Box mb="6" />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Inputs
              label="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Password"
              error={errors.password}
              secureTextEntry
            />
          )}
          name="password"
        />
        <Box mb="5.5" />
        <Box flexDirection='row' justifyContent='flex-end'>
          <Pressable onPress={navigateToRecover}>
            <Text color="primary">forgot password?</Text>
          </Pressable>
        </Box>
        <Box mb="5.5" />

        <Button label="Login" onPress={handleSubmit(onSubmit)} uppercase />
        <Box mt="5.5" />
        <Box flexDirection='row' justifyContent='center'>
          <Text>
            Don't have a account? 
          </Text>
          <Pressable onPress={navigateToSignInScreen}>
          <Text color="primary" textAlign="right">
            Register
          </Text>
        </Pressable>
        </Box>
      </Box>
    </SafeAreaWrapper>
  )
}

export default SignInScreen