import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    function call(){
        if(Cookies.get("token") === undefined){
            navigate("/signup");
        }
    }
    call();
    const [todos,setTodos] = useState([]);
    
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
    function removeCookies (){
        Cookies.remove("token");
        navigate("/signup")
    }
  return (
    <div className='min-h-screen   bg-stone-100'>
        <div className='h-20 px-4 flex items-center md:justify-center sticky top-0 bg-white shadow-md z-30'>
            <h1 className='text-2xl  font-bold'>Todos</h1>
            <div className='absolute right-2 md:right-14  px-3 py-1 flex gap-2 '>
            <button onClick={()=>navigate("/add")} className=' bg-green-500 border px-3 py-1 hover:bg-green-700 text-white font-semibold rounded-md  border-black'>ADD +</button>
            <button onClick={removeCookies} className='border-2 font-semibold px-2 py-1 text-gray-500 border-gray-500 rounded-lg '>Sign Out</button>
            </div>
        </div>
        
        <div className=' flex flex-wrap gap-4 m-12 z-1'>
        {
            todos.map((item,index)=>(
                <div key = {index}>
                    
                    <Card id={item.id} title={item.title} description={item.description} done={item.done} edit={true} />
                </div>
            ))
        }
    </div>
    </div>
  )
}

export default Dashboard