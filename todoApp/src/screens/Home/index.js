import React, { useState } from 'react';
import { Alert, Dimensions, FlatList, Pressable } from 'react-native';
import useSWR from 'swr';
import Loader from '../../components/shared/loader';
import SafeAreaWrapper from '../../components/shared/safe-area-wrapper';
import { fetcher } from '../../services/config';
import theme, { Box, Text } from '../../utils';
import Ionicons from '@expo/vector-icons/Ionicons';
import { deleteTask, doneTask } from '../../services/api';

const Home = () => {

  async function onDelte(id){
    const _users = await deleteTask({
      id: id,
    })
    Alert.alert("Deleted")

  }
  async function onDone(id){
    const _users = await doneTask({
      id: id,
    })

  }
  
    const {data,isLoading} = useSWR(`todo/bulk`,fetcher);
    if(isLoading){
      return <Loader />
    }
    
  return (
    <SafeAreaWrapper>
      <Box flex={1} px="4" gap={4}>
        <Text variant="textXl" fontWeight='700' textAlign='center' >Home</Text>
        <FlatList  data={data} renderItem={({item})=>(
          <Box gap={4} marginBottom={4} alignItems='center'  borderWidth={1} py={2}  >
            
            <Text variant="textLg" fontWeight='500'>
              {item.title}
            </Text>
            <Text>{item.description}</Text>
            <Pressable onPress={()=>onDone(item.id)}>
              {item.done? <Box flexDirection='row' alignItems='center' ><Ionicons name='checkbox' size={24} color="green"  /><Text>Done</Text></Box>: <Box flexDirection='row' alignItems='center' ><Ionicons name='square-outline' size={24} color="red"  /><Text>UnDone</Text></Box>}
            </Pressable>
            <Box flexDirection='row' px={10} pb={4} width={Dimensions.get('window').width} justifyContent='flex-end'>
            <Pressable onPress={()=>onDelte(item.id)} borderWidth={1}>
              <Ionicons name='trash' size={24} color="red"  />
            </Pressable>
            </Box>
          </Box>
  )}   
        />
    </Box>
    </SafeAreaWrapper>
    
  )
}

export default Home