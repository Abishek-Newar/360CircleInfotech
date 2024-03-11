import axios from 'axios';
import Cookies from 'js-cookie';
import React from 'react'
import { FaRegTrashAlt } from "react-icons/fa";

const Card = ({id,title,description,done}) => {
  async function handleDelete(id){
    try{
      const res = await axios.delete("http://localhost:3000/api/v1/todo/delete",{
        data: {
          id: id
        },
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`
        }
      })
      if(res){
        alert ("todo deleted")
      }
      window.location.reload();
      
    }
    catch(e){
      alert("error while deleting")
    }
  }
  async function changeDone(id){
    console.log(id);
    const requestBody = { id };
    try{
      const res = await axios.put("http://localhost:3000/api/v1/todo/update",requestBody,{
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`
        }
    })
      window.location.reload()
    }
    catch(e){
      alert("error")
    }
    
  }
  return (
    <div className='w-[300px] h-auto min-h-[300px] border rounded-lg relative flex justify-center flex-col items-center p-6 '  >
        <div className='border absolute top-6  w-full h-auto text-center '>
        <h1>{title}</h1>
        <FaRegTrashAlt onClick={()=>handleDelete(id)} className='right-1 text-red-600 cursor-pointer absolute top-1 ' />
        </div>
        <h1>{description}</h1>
        <button onClick={()=>changeDone(id)} className={`absolute bottom-6 border w-36 py-1 rounded-md ${done? "border-green-500 text-green-500": "border-red-500 text-red-500"}`}>{done? "Done" : "Not Done"}</button>
    </div>
  )
}

export default Card