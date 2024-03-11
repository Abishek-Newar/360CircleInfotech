import { TextInput } from "react-native"
import SafeAreaWrapper from "../../components/shared/safe-area-wrapper"
import theme, { Box, Text } from "../../utils"
import { Controller, useForm } from "react-hook-form"
import Button from "../../components/button"
import { useOtp } from "../../store/useUserGlobalStore"


const RecoveryEmail = () => {
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
  async function onClick(){
    const otps = Math.floor(Math.random()*9000) + 1000;
    console.log(otps)
    
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