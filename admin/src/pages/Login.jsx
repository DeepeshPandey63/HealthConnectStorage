import React from "react";
import { assets } from "../assets/assets";
import { useState,useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DoctorContext } from "../context/DoctorContext";
const Login = () => {
  const [state, setState] = useState("Admin");
  const {setAToken,backendUrl}=useContext(AdminContext);
  const {setDToken}=useContext(DoctorContext)
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const onSubmitHandler= async (e)=>{
    e.preventDefault();
    try{
        if(state==='Admin'){
            const {data}=await axios.post(backendUrl + '/api/admin/login',{email,password})
            setAToken(data.token);
            if(data.success){
                localStorage.setItem('aToken',data.token)
                setAToken(data.token);
                toast.success("success")
            }
            else{
                toast.error(data.message);
            }
        }
        else{
          const {data}=await axios.post(backendUrl+"/api/doctor/login",{email,password})
          if(data.success){
            localStorage.setItem('dToken',data.token)

            setDToken(data.token)
            
          }
          else{
            toast.error(data.message)
          }
        }
    }
    catch(e){
        
    }
  }
return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto"><span className="text-primary">{state}</span> Login </p>
        <div className="w-full">
            <p>Email</p>
            <input onChange={(e)=>setEmail(e.target.value)} className="border border-[#DADADA] rounded w-full p-2 mt-1" type="email" required></input>
        </div>
        <div className="w-full">
            <p>Password</p>
            <input onChange={(e)=>setPassword(e.target.value)} className="border border-[#DADADA] rounded w-full p-2 mt-1" type="password" required></input>
        </div>
        <button className="bg-primary w-full text-white py-2 rounded-md text-base mt-2">Login</button>
        {
            state==='Admin' ?
            <p>Doctor Login ? <span className="text-primary underline decoration-solid cursor-pointer" onClick={()=>setState('Doctor')}  >Click here</span></p> 
            :<p>Admin Login ? <span onClick={()=>setState('Admin')} className="text-primary underline decoration-solid cursor-pointer">Click here</span></p> 

        }
      </div>
    </form>
  );
};

export default Login;
