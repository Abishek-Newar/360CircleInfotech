import axios from "axios"
import * as SecureStore from "expo-secure-store"

export const BASE_URL = "http://192.168.1.6:3000/api/v1/"
const TIME_OUT = 30000;
export const TOKEN_NAME = "tokens"
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
})

export const saveToken = async (key, value) => {
    try{
        await SecureStore.setItemAsync(key, value)
    }catch(e){
        console.log('error in saveToken', e)
        throw(e)
    }
}

axiosInstance.interceptors.request.use(async (req)=>{
    try{
        const access_token = await SecureStore.getItemAsync(TOKEN_NAME)
        req.headers.Authorization = access_token;
        return req;
    }catch (e) {
        return req
    }
})

export const fetcher = async(url) => {
    try{
        const res = await axiosInstance.get(url)
        return res.data.todos;
    }catch(e){
        console.log(e)
    }
}

export default axiosInstance