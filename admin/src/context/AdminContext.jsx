import React from "react";
import axios from 'axios'
import {toast} from 'react-toastify'
import { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors,setDoctors]=useState([])
  const [appointments,setAppointments]=useState([])
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );

  const [dashData,setDashData]=useState(false);



  const changeAvailability=async(docId)=>{
      try {
        const data=await axios.post(backendUrl+'/api/admin/change-availability',{docId},{headers: {
          "Authorization": `Bearer ${aToken}`
        }})
        console.log(data.data.success)
        if(data.data.success)
        {
          toast.success(data.data.message);
          getAllDoctors();
        }
        else{
          toast.error(data.data.message);
        }
      } catch (error) {
        toast.error(error.message);  
      }
  }

  const getAllAppointments=async ()=>{
    try{
      const {data} =await axios.get(backendUrl+"/api/admin/appointments",{headers:{
        "Authorization":`Bearer ${aToken}`
      }})

      if(data.success){
        setAppointments(data.appointments.reverse())
        
        
      }
      else{
        toast.error(data.message)
      }
    }catch(e){
      toast.error(e.message)
    }
  }

  
  const getAllDoctors=async()=>{
    try {
      const {data}=await axios.post(backendUrl+'/api/admin/all-doctors',{},{headers: {
        "Authorization": `Bearer ${aToken}`
      }});
      if(data.success)
      {
        setDoctors(data.doctors)
        console.log(data.doctors)
      }
      else
      {
        
        
        toast.error(data.message);  
      }
    } catch (error) {
      toast.error(error.message);  
    }
  }
  const getDashData=async()=>{
    try {
      const {data}=await axios.get(backendUrl+"/api/admin/dashboard",{headers: {
        "Authorization": `Bearer ${aToken}`
      }})
      if(data.success)
      {
        setDashData(data.dashData);
        console.log(data);
      }
      else
      {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);   
    }
  }


  const cancelAppointment=async (appointmentId)=>{
    try{
      const {data}=await axios.post(backendUrl+'/api/admin/cancel-appointment',{appointmentId},{headers:
        {
          "Authorization":`Bearer ${aToken}`
        }
      })
      if(data.success){
        toast.success(data.message)
        getAllAppointments()
      }
      else{
        toast.error(data.message)
      }
    }catch(e){
      toast.error(e.message)
    }
  }

  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    appointments,
    getAllDoctors,
    changeAvailability,
    dashData,
    getDashData,
    getAllAppointments,
    cancelAppointment

  };
  return (
    <div>
      <AdminContext.Provider value={value}>
        {props.children}
      </AdminContext.Provider>
    </div>
  );
};

export default AdminContextProvider;
