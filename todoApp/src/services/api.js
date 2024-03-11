import axiosInstance, { TOKEN_NAME, saveToken } from "./config";


export const registerUser = async({email,name,password}) => {
    
    try{
        const response = await axiosInstance.post("/user/signup",{
            email,
            name,
            password
        })
        return response.data;
    }catch(e){
        console.log("error in register",e);
        throw error
    }
}
export const createTask = async({title,description}) => {
    
    try{
        const response = await axiosInstance.post("/todo/add",{
            title,
            description
        })
        return response.data;
    }catch(e){
        console.log("error in createPost",e);
        throw error
    }
}
export const deleteTask = async({id}) => {
    console.log(id);
    try{
        const response = await axiosInstance.delete("/todo/delete",{
            data: {id},
        })
        const _token = `Bearer ` + response.data.token ;
        console.log(_token)
        axiosInstance.defaults.headers.common["Authorization"] = _token
        return response.data;
    }catch(e){
        console.log("error in createPost",e);
        throw error
    }
}
export const doneTask = async({id}) => {
    console.log(id);
    try{
        const response = await axiosInstance.put("/todo/update",{
            id: id,
        })
        const _token = `Bearer ` + response.data.token ;
        console.log(_token)
        axiosInstance.defaults.headers.common["Authorization"] = _token
        return response.data;
    }catch(e){
        console.log("error in createPost",e);
        throw error
    }
}
export const checkEmail = async({email}) =>{
    try{
        const res = await axiosInstance.get("/checks",{
            params: {
                email: email,
            }
        })
        return true
    }
    catch(e){
        return false
    }
}

export const sendEmail = async({email,OTP}) => {
    console.log(OTP);
    try{
        const res = await axiosInstance.post("/send_recovery_email",{
            OTP: OTP,
            email
        })
        return true;
    }catch(e){
        throw error
    }
}
export const changePassword = async({email,password}) =>{
    try{
        console.log(password)
        const res = await axiosInstance.put("/user/updatepassword",{email,password});
        const _token = `Bearer ` + response.data.token ;
        console.log(_token)
        axiosInstance.defaults.headers.common["Authorization"] = _token
        saveToken(TOKEN_NAME, _token)
        return response.data;
    }catch(e){
        console.log(e)
        throw e
    }
}

export const loginUser = async({email,password}) => {
    
    try{
        console.log(email);
        const response = await axiosInstance.post("/user/signin",{
            email,
            password
        })
        const _token = `Bearer ` + response.data.token ;
        console.log(_token)
        axiosInstance.defaults.headers.common["Authorization"] = _token
        saveToken(TOKEN_NAME, _token)
        return response.data;
    }catch(e){
        console.log("error in login",e);
        throw error
    }
}