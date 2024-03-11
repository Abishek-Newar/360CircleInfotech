import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { TiTickOutline } from "react-icons/ti";
const Card = ({id,title,description,done,edit}) => {
  const [edits,setEdits]  = useState(edit);
  const [titles,setTitles] = useState(title);
  const [descriptions,setDescriptions] = useState(description);

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
  async function changeTodo(id){
    try{
      const res = await axios.put("http://localhost:3000/api/v1/todo/updatetodo",{
          id: id,
          title: titles,
        description: descriptions
      },{
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`
        }
      })
      window.location.reload()
    }
    catch(e){
      alert("error updating todo")
    }
  }
  return (
    <div>
      {
        edits?
        <div className='w-[300px] bg-white h-auto min-h-[300px] border rounded-lg relative flex justify-center flex-col items-center p-6 '  >
        <div className=' border-b-2 border-black absolute top-6  w-full h-auto text-center '>
        <FaPencilAlt onClick={()=>setEdits(!edit)} className='absolute left-3 top-1 ' />
        <h1>{title}</h1>
        <FaRegTrashAlt onClick={()=>handleDelete(id)} className='right-1 text-red-600 cursor-pointer absolute top-1 ' />
        </div>
        <h1>{description}</h1>
        <button onClick={()=>changeDone(id)} className={`absolute bottom-6 border w-32 py-1 rounded-lg transition-all ease-linear duration-500 border-black text-white font-semibold ${done? "bg-green-500 disabled": "bg-red-500 hover:bg-red-700"}`} disabled={done? true : false}>{done? <div className='flex justify-center items-center gap-2'><TiTickOutline className='text-white text-2xl' /> Done</div> : "Not Done"}</button>
    </div>
    :
    <div className='w-[300px] bg-white  h-auto min-h-[300px] border rounded-lg relative flex justify-center flex-col items-center p-6 '  >
        <div className=' border-b-2 border-black absolute top-6  w-full h-auto text-center '>
        <input className='border-black border rounded-lg' type='text' value={titles} onChange={(e)=>setTitles(e.target.value)} />
        <FaRegTrashAlt onClick={()=>handleDelete(id)} className='right-1 text-red-600 cursor-pointer absolute top-1 ' />
        </div>
        <textarea type="text" className='h-20 rounded-lg border border-black ' value={descriptions} onChange={(e)=>setDescriptions(e.target.value)} />
        <button onClick={()=>changeTodo(id)} className='w-32 absolute bottom-6 py-1 border border-black rounded-lg bg-sky-500 text-white font-semibold'>
          Save
        </button>
      </div>
      }
    </div>
  )
}

export default Card