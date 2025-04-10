import React from 'react'
import { createContext } from 'react';
import { useState } from 'react';
import {toast} from 'react-toastify'
import axios from 'axios'
export const DoctorContext=createContext();

const DoctorContextProvider = (props) => {
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const [dToken, setDToken] = useState(
        localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
      );
      const [appointments,setAppointments]=useState([])
    const [dashData,setDashData]=useState(false)
    const [profileData,setProfileData]=useState(false)


      const getAppointments=async ()=>{
        try{
            const {data}=await axios.get(backendUrl+'/api/doctor/appointments',{headers:{
                "Authorization":`Bearer ${dToken}`
            }})

            if(data.success){
                setAppointments(data.appointments.reverse())
                
            }
            else{
                toast.error(data.message)
            }
        }catch(e){
            toast.error(e.message)
            console.log(e)
        }
      }

      const completeAppointment=async (appointmentId)=>{
        try{
            const {data}=await axios.post(backendUrl+'/api/doctor/complete-appointment',{appointmentId},{headers:{
                "Authorization":`Bearer ${dToken}`
            }})
            if(data.success){
                toast.success(data.message)
                getAppointments()
            }
            else{
                toast.error(data.message)
            }
        }catch(e){
            console.log(e);
            toast.error(e.message)
        }
      }

      const cancelAppointment=async (appointmentId)=>{
        try{
            const {data}=await axios.post(backendUrl+'/api/doctor/cancel-appointment',{appointmentId},{headers:{
                "Authorization":`Bearer ${dToken}`
            }})
            if(data.success){
                toast.success(data.message)
                getAppointments()
            }
            else{
                toast.error(data.message)
            }
        }catch(e){
            console.log(e);
            toast.error(e.message)
        }
      }

      const getDashData=async()=>{
        try {
            const {data}=await axios.get(backendUrl+"/api/doctor/dashboard",{headers:{
                "Authorization":`Bearer ${dToken}`
            }})
           
            
            if(data.success)
            {
                setDashData(data.dashData)
                console.log(data.dashData);
                
            }
            else
            {
                toast.error(data.message)
            }
        } catch (e) {
            console.log(e);
            toast.error(e.message)
        }
    }

    const getProfileData=async()=>{
        try {

            const {data}=await axios.get(backendUrl+"/api/doctor/profile",{headers:{
                "Authorization":`Bearer ${dToken}`
            }})
            if(data.success)
            {
                setProfileData(data.profileData)
                console.log(data.profileData)
            }
            
        } catch (e) {
            console.log(e);
            toast.error(e.message)
        }
    }


    const value={
        dToken,setDToken,
        appointments,setAppointments,getAppointments,completeAppointment,cancelAppointment,
        backendUrl,dashData,setDashData,getDashData,profileData,setProfileData,getProfileData
    }
    
  return (
    <div>
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    </div>
 

)
}

export default DoctorContextProvider