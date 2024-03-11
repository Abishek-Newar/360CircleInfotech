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