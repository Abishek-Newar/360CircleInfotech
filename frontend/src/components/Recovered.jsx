import React from "react";
import { LabeledInput } from "./Authen";
import axios from "axios";
import { useRecoilState } from "recoil";
import { emailState, otpState, pageState } from "../data";

export default function Recovered() {
    const [page, setPage] = useRecoilState(pageState);
    const [otp,setOtp] = useRecoilState(otpState);
    const [email,setEmail] = useRecoilState(emailState);
    async function recovers(e){
        e.preventDefault();
        console.log(email);
        try{
            if(email){
            
                const opts = Math.floor((Math.random()*9000) + 1000) ;
                const res = await axios.get(`http://localhost:3000/api/v1/checks`,{
                    params: {
                        email: email,
                    }
                })
                console.log(opts);
                setOtp(opts);
                if(res){
                    const response = await axios.post("http://localhost:3000/api/v1/send_recovery_email",{
                        otp,
                        email
                    })
                    setPage("otp")
                    
                }
                console.log(otp);
        }
    }
        catch(e){
            alert("error");
        }
        
    }
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
       <div className="w-full h-auto md:w-[350px] md:border rounded-md px-6 py-10 select-none">
        <h1 className="text-center mb-6 text-2xl font-bold ">Reset Password</h1>
        <LabeledInput type="email" sname="Enter Recovery Email: " placeholder="abi@gmail.com..." id="email" onChange={(e)=>{setEmail(e.target.value)}} />
        <button onClick={recovers} className="w-full bg-sky-500 h-8 rounded-lg text-white font-semibold">Send OTP</button>
       </div>
    </div>
  );
}