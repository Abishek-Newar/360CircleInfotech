import React from 'react'
import Button from "../../components/button"
import SafeAreaWrapper from '../../components/shared/safe-area-wrapper'
import theme, { Box, Text } from '../../utils'
import { Alert, TextInput } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { createTask } from '../../services/api'
import { useNavigation } from '@react-navigation/native'
const Completed = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  })
    async function onClick(data){
      const {title, description} = data;
      const _users = await createTask({
        title: title,
        description: description
      })
      Alert.alert("todo added")
      navigation.navigate("Home")
    }
  return (
    <SafeAreaWrapper>
        <Box  gap={6} justifyContent='center' flex={1} paddingHorizontal="10">
          <Text textAlign='center' variant="text3Xl" fontWeight='700'>Create Tasks</Text>
          <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
        style={{
          padding: 16,
          borderWidth: 1,
          borderColor:  theme.colors.grey,
          borderRadius: theme.borderRadii["rounded-7xl"],
        }}
        name="title"
        value={value}
        placeholder='Title'
        onChangeText={onChange}
      />
          )}
          name="title"
        />
        
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
        style={{
          padding: 16,
          borderWidth: 1,
          borderColor:  theme.colors.grey,
          borderRadius: theme.borderRadii["rounded-7xl"],
        }}
        name="description"
        value={value}
        placeholder='Description'
        onChangeText={onChange}
      />
          )}
          name="Description"
        />
      <Button onPress={handleSubmit(onClick)} label="ADD"></Button>
    </Box>
    </SafeAreaWrapper>
    
  )
}

export default Completed