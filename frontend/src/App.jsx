import { BrowserRouter, Route, Routes } from "react-router-dom"
import Auth from "./pages/Signup"
import Dashboard from "./pages/dashboard"
import Signin from "./pages/Signin"
import AddTodo from "./pages/AddTodo"
import Recovery from "./pages/Recovery"
import {useState} from "react"
import React from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

function App() {

  return (
    <>
    <RecoilRoot>
    <BrowserRouter>
       <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<AddTodo />} />
        <Route path="/recover" element={<Recovery />} />
       </Routes>
      </BrowserRouter>
    </RecoilRoot>
    
    </>
  )
}

export default App
