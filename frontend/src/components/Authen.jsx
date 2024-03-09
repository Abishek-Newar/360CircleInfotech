import React, { useState } from 'react'
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
const Authen = ({type}) => {
    const navigate = useNavigate();
    const [inputs,setInputs] = useState({
        name: "",
        email: "",
        password: ""
    })
    async function handleSingin(){
        console.log(inputs);
        const res = await axios.post(`http://localhost:3000/api/v1/user/${type}`,inputs)
        Cookies.set("token",res.data.token);
        navigate("/dashboard");
    }
  return (
    <div className='min-h-screen w-screen flex items-center justify-center '>
        <div className='max-w-xl w-[400px] md:border p-8 rounded-md bg-stone-200'>
            <div className='mb-6'>
                <h2 className='text-3xl font-bold text-center'>{type === "signin"? "Login" : "Signup"} </h2>
                <p className='text-sm text-stone-400 text-center'>Enter your credentials for {type === "signin"? "Login" : "Signup"}</p>
                <div>{type === "signin"? 
                 <p className='text-sm text-stone-400 text-center'>Dont have a Account? <Link className='underline' to="/signup">Sign Up</Link></p>
                 :
                 <p className='text-sm text-stone-400 text-center'>Dont have a Account? <Link className='underline' to="/">Login</Link></p>
                  }</div>
            </div>
            {
                type === "signup"?  
                <LabeledInput type="text" name="Name: " placeholder="Abi" id="name" onChange={(e)=>{setInputs({...inputs, name: e.target.value})}} />
                :null
            }
            <LabeledInput type="text" placeholder="abi@gmail.com" name="Email:" id="email" onChange={(e)=>{setInputs({...inputs, email: e.target.value})}}  />
            <LabeledInput type="password" placeholder="abi@123" name="Password: " id="pass" onChange={(e)=>{setInputs({...inputs, password: e.target.value})}} />
             {
                type === "signin"?
                <div className='flex w-full justify-end'><Link to="/recover">forgot password?</Link></div>
                :
                null
             }
            <button onClick={handleSingin} className='w-full h-12 bg-black text-white rounded-md hover:bg-gray-800 transition-all ease-linear duration-500'>{type === "signin"? "Login" : "Sign Up"}</button>
        </div>
    </div>
  )
}
export const LabeledInput = React.memo(({Sname,type,placeholder,id,onChange}) =>(
     <label  htmlFor={id}>
        <h2>{Sname}</h2>
        <input className='border rounded-lg p-2 w-full mb-4' type={type} placeholder={placeholder} id={id} onChange={onChange} />
    </label>
))
export default Authen