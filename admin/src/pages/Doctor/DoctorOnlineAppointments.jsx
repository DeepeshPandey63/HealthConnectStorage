import React, { useState } from 'react'
import  {DoctorContext}  from '../../context/DoctorContext'
import {useContext ,useEffect} from 'react'
import { AppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCallback } from 'react'
import { useSocket } from '../../context/SocketProvider'


const DoctorOnlineAppointments = () => {
    const {dToken,appointments,getAppointments,completeAppointment,cancelAppointment}=useContext(DoctorContext)
    const { slotDateFormat, calculateAge, currency } = useContext(AppContext)
    const [onlineAppointments,setOnlineAppointments]=useState([]);
    const navigate = useNavigate();
   const socket = useSocket();
   // Listen for room joining through socket
  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room,id } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  // Handle form submission
  const handleSubmitForm = async (docData, uniqueNumber,id) => {
    try {
        const email = docData.email;
        const room = uniqueNumber;
        socket.emit("room:join", { email, room ,id});
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        toast.error(error.message);
      }
  };

  // Handle attendance
  const handleAttendance = async (uniqueNumber, docData,id) => {
    try {
      await handleSubmitForm(docData, uniqueNumber,id);
    } catch (error) {
      console.error("Error handling attendance:", error.message);
    }
  };
  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

useEffect(() => {
    getAppointments();
}, [dToken]);

useEffect(() => {
    const findOnlineAppointments = () => {
        const online = appointments.filter(appointment => appointment.isOnline);
        setOnlineAppointments(online);
    };
    findOnlineAppointments();
}, [appointments]); 


  return (
    <div className='w-full max-w-6xl m-5 '>

      <p className='mb-3 text-lg font-medium'>Online Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_3fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
         
          <p>Age</p>
          <p>Date & Time</p>
          <p></p>
          
        </div>
        {onlineAppointments.map((item, index) => (
          <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_3fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
            <p className='max-sm:hidden'>{index+1}</p>
            <div className='flex items-center gap-2'>
              <img src={item.userData.image} className='w-8 rounded-full' alt="" /> <p>{item.userData.name}</p>
            </div>
            
            <p className='max-sm:hidden'>{item.userData.dob==="Not Selected"?NaN:calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <div className="flex flex-col gap-2 justify-end">
              {!item.cancelled && item.payment && !item.isCompleted && (
                <button
                  onClick={() => handleAttendance(item.uniqueNumber, item.docData,item._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Attend Meeting
                </button>
              )}
              {item.cancelled && !item.isCompleted && (
                <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                  Appointment Cancelled
                </button>
              )}
              {((item.payment && !item.isOnline)||(item.isCompleted && item.isOnline))&& (
                <button className="sm:min-48 py-2 px-4 border border-green-500 rounded text-green-500">
                  Completed
                </button>
              )}
            </div>
            </div>
        ))}
        </div>
        </div>
  )
}

export default DoctorOnlineAppointments