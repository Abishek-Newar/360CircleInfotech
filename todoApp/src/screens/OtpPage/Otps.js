import React from 'react'
import SafeAreaWrapper from '../../components/shared/safe-area-wrapper'
import theme, { Box, Text } from '../../utils'
import { useOtp } from '../../store/useUserGlobalStore'
import { Alert, TextInput } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import Button from '../../components/button'

const Otps = () => {
    const {otp} = useOtp();
    const navigator = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otps: "",
    },
  })
  async function onClick(data){
    const {otps} = data;
    console.log(otp);
    console.log(otps)
    if(otp == otps){
        console.log("done")
        navigator.navigate("confirm")
    }else{
        Alert.alert("WRONG OTP")
    }
  }
  return (
    <SafeAreaWrapper>
        <Box flex={1} gap={6} justifyContent='center' paddingHorizontal={10} >
            <Text variant="textXl" textAlign='center' fontWeight='700'>Enter OTP</Text>
            <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
        style={{
          padding: 16,
          borderWidth: 1,
          borderColor:  theme.colors.grey,
          borderRadius: theme.borderRadii["rounded-7xl"],
        }}
        name="otps"
        value={value}
        placeholder='Enter OTP'
        onChangeText={onChange}
        keyboardType='numeric'
      />
      )}
          name="otps"
        />
        <Button label="RESET" onPress={handleSubmit(onClick)}>OTP</Button>
        </Box>
    </SafeAreaWrapper>
  )
}

export default Otps