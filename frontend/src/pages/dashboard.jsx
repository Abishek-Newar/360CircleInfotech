import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [todos,setTodos] = useState([]);
    const navigate = useNavigate();
    async function backs(){
        const todos = await axios.get("http://localhost:3000/api/v1/todo/bulk",{
            headers: {
                "authorization": `Bearer ${Cookies.get("token")}`
            }
        })
        setTodos(todos.data.todos)
    }
    useEffect(()=>{
        backs();
    },[])
  return (
    <div className='min-h-screen   bg-stone-100'>
        <div className='h-20  flex items-center justify-center sticky top-0 bg-white shadow-md z-30'>
            <h1 className='text-2xl  font-bold'>Todos</h1>
            <button onClick={()=>navigate("/add")} className='absolute right-14 border px-3 py-1 bg-green-400 rounded-md  border-black'>ADD +</button>
        </div>
        
        <div className=' flex flex-wrap gap-4 m-12 z-1'>
        {
            todos.map((item,index)=>(
                <div key = {index}>
                    
                    <Card id={item.id} title={item.title} description={item.description} done={item.done} />
                </div>
            ))
        }
    </div>
    </div>
  )
}

export default Dashboard