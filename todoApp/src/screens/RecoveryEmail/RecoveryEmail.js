import { Alert, TextInput } from "react-native"
import SafeAreaWrapper from "../../components/shared/safe-area-wrapper"
import theme, { Box, Text } from "../../utils"
import { Controller, useForm } from "react-hook-form"
import Button from "../../components/button"
import { useEmail, useOtp } from "../../store/useUserGlobalStore"
import { checkEmail, sendEmail } from "../../services/api"
import { useNavigation } from "@react-navigation/native"


const RecoveryEmail = () => {
  const navigator = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: ""
    },
  })
  const {setOtp} = useOtp() 
  const {setEmail} = useEmail()
  async function onClick(data){
    const {email} = data
    const otps = Math.floor(Math.random()*9000) + 1000;
    console.log(otps)
    try{
      const _email = await checkEmail({
        email: email
      })
      if(_email){
        const _sent = await sendEmail({
          email: email,
          OTP: otps,
        })
        
      }
      else{
        Alert.alert("Email not found")
      }
      setOtp(otps)
      setEmail(email)
      navigator.navigate("otps")
    } catch(e){
      console.log(e);
      Alert.alert("error sending mail")
    }
  }
  
  return (
    <SafeAreaWrapper>
        <Box  gap={6}  justifyContent='center' flex={1} paddingHorizontal={10}>
        <Text textAlign="center" variant="textXl" fontWeight="700">
            Reset Password
        </Text>
    
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
        name="email"
        value={value}
        placeholder='Recovery Email'
        onChangeText={onChange}
        inputMode="email"
      />
      )}
          name="email"
        />
        <Button onPress={handleSubmit(onClick)} label="ADD"></Button>
    </Box>
    </SafeAreaWrapper>
  )
}

export default RecoveryEmail