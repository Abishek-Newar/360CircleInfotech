import React, { useState } from 'react'
import { LabeledInput } from '../components/Authen'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const AddTodo = () => {
  if(Cookies.get("token") === null){
    navigate("signup");
}
  const navigate = useNavigate();
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    async function handleAdd(){
      try{
        const todos = await axios.post("http://localhost:3000/api/v1/todo/add",{
          title,
          description
        },{
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`
          }
      })
      navigate("/dashboard");
      }
      catch(e){
        alert("ERROR");
      }
    }
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <h1 className='absolute top-10 font-bold text-3xl'>ADD TODO</h1>
        <div className='px-10 max-w-xl select-none '>
            <LabeledInput type="text" name="Title" placeholder="title ..." onChange={(e)=>{setTitle(e.target.value)}} />
            <label htmlFor="description">
              <h2>Description</h2>
              <textarea className='border rounded-md w-full'  id="Description" cols="30" rows="10" onChange={(e)=>{setDescription(e.target.value)}}></textarea>
            </label>
            <button onClick={handleAdd} className='w-full bg-green-400 h-12 hover:bg-green-600 rounded-md transition-all ease-int-out duration-500 select-none'>Add</button>
        </div>
    </div>
  )
}

export default AddTodo