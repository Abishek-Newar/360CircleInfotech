import React from 'react'
import SafeAreaWrapper from '../../components/shared/safe-area-wrapper'
import theme, { Box, Text } from '../../utils'
import { useEmail } from '../../store/useUserGlobalStore'
import { useNavigation } from '@react-navigation/native'
import { Controller, useForm } from 'react-hook-form'
import { Alert, TextInput } from 'react-native'
import Button from '../../components/button'
import { changePassword } from '../../services/api'

const ConfirmScreen = () => {
    const {email} = useEmail();
    const navigator = useNavigation();
  const {
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      newpassword: "",
      confirmpassword: ""
    },
  })
  async function OnClick(data){
    const {newpassword, confirmpassword} = data;
    try{
        if(newpassword === confirmpassword){
            const _confirm = await changePassword({
                email: email,
                password: newpassword
            })
        }
        else{
            Alert.alert("pasword doesn,t match")
        }
        navigator.navigate("SignIn")
    }
    catch(e){
        console.log(e)
        Alert.alert("error while changing password");
    }
  }
  return (
    <SafeAreaWrapper>
        <Box flex={1} justifyContent='center' gap={6}>
            <Text variant="textXl" fontWeight='700'>SET NEW PASSWORD</Text>
            
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
        name="newpassword"
        value={value}
        placeholder='Enter New Password'
        onChangeText={onChange}
      />
      )}
          name="newpassword"
        />
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
        name="confirmpassword"
        value={value}
        placeholder='Confirm Password'
        onChangeText={onChange}

      />
      )}
          name="confirmpassword"
        />
        <Button label="Change Password" onPress={handleSubmit(OnClick)}></Button>
        </Box>
    </SafeAreaWrapper>

  )
}

export default ConfirmScreen