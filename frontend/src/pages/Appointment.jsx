import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";
const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol ,backendUrl,token,getDoctorsData} = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const navigate=useNavigate();
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);

    const workingHours = {
      startHour: 10, // 10 AM
      endHour: 21, // 9 PM
    };

    const today = new Date();
    const bookedSlots = docInfo ? docInfo.slots_booked || {} : {};

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let startTime = new Date(currentDate);
      if (i === 0) {
        // If today , start from the next available  interval
        startTime.setMinutes(Math.ceil(today.getMinutes() / 30) * 30);
        if (startTime.getHours() < workingHours.startHour) {
          startTime.setHours(workingHours.startHour);
        }
      } else {
        // for future days start from 10 AM
        startTime.setHours(workingHours.startHour, 0, 0, 0);
      }

      let endTime = new Date(currentDate);
      endTime.setHours(workingHours.endHour, 0, 0, 0);

      const timeSlots = [];
      while (startTime < endTime) {
        const formattedTime = startTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const slotDate = `${startTime.getDate()}_${
          startTime.getMonth() + 1
        }_${startTime.getFullYear()}`;
        const isSlotAvailable = !bookedSlots[slotDate]?.includes(formattedTime);

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(startTime),
            time: formattedTime,
          });
        }

        startTime.setMinutes(startTime.getMinutes() + 30); // Increment by 30 minutes to get nxt slot
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookOnlineAppointment=async()=>{
    if(!token)
      {
        toast.warn('Login to book appointment')
        return navigate('/login')
      }
  
      try {
        if(slotTime==="")
        {
          toast.error("Please Select Slot Time")
          
        }
        else{
          const date =docSlots[slotIndex][0].datetime;
        let day=date.getDate() 
        let month=date.getMonth()+1;
        let year=date.getFullYear()
        const slotDate=day+"_"+month+"_"+year;
        
        const {data}=await axios.post(backendUrl+'/api/user/book-online-appointment',{docId,slotDate,slotTime},{headers:{'Authorization':`Bearer ${token}`}})
        
        if (data.success) {
          toast.success(data.message);
          getDoctorsData();
          navigate('/my-appointments');
        }
        else
        {
          toast.error(data.message);
        }
        }
        
      } catch (error) {
        console.log(error)
        toast.error(error.message);
      }
  
  }
  const bookAppointment =async()=>{
    if(!token)
    {
      toast.warn('Login to book appointment')
      return navigate('/login')
    }

    try {
      if(slotTime==="")
      {
        toast.error("Please Select Slot Time")
        
      }
      else{
        const date =docSlots[slotIndex][0].datetime;
      let day=date.getDate() 
      let month=date.getMonth()+1;
      let year=date.getFullYear()
      const slotDate=day+"_"+month+"_"+year;
      
      const {data}=await axios.post(backendUrl+'/api/user/book-appointment',{docId,slotDate,slotTime},{headers:{'Authorization':`Bearer ${token}`}})
      
      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate('/my-appointments');
      }
      else
      {
        toast.error(data.message);
      }
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message);
    }

  }

  useEffect(() => {
    fetchDocInfo();
  }, [docId, doctors]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
  }, [docSlots]);

  return (
    docInfo && (
      <div className="">
        {/* doctors data */}
        <div className="flex flex-col sm:flex-row gap-4 mt-5">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt="doctor"
            />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white ms-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <div>
              {/* doc info */}
              <p className="flex flex-start gap-2 text-2xl font-medium text-gray-900">
                {docInfo.name}
                <img className="w-5" src={assets.verified_icon} alt="" />
              </p>
            </div>
            <div className="flex flex-start gap-2 text-gray-600">
              <p>
                {docInfo.degree}-{docInfo.speciality}
              </p>
              <button className="border text-xs rounded-full py-0.5 px-2 mt-0.5">
                {docInfo.experience}
              </button>
            </div>
            {/* doc exp */}
            <div className="">
              <p className="flex flex-start gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* booking slots */}

        <div className='sm:ml-72 sm:pl-4 mt-8 font-medium text-[#565656]'>
                <p >Booking slots</p>
                <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
                    {docSlots.length && docSlots.map((item, index) => (
                        <div onClick={() => setSlotIndex(index)} key={index} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-[#DDDDDD]'}`}>
                            <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                            <p>{item[0] && item[0].datetime.getDate()}</p>
                        </div>
                    ))}
                </div>

                <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
                    {docSlots.length && docSlots[slotIndex].map((item, index) => (
                        <p onClick={() => setSlotTime(item.time)} key={index} className={`text-sm font-light  flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-[#949494] border border-[#B4B4B4]'}`}>{item.time.toLowerCase()}</p>
                    ))}
                </div>

                <div className="flex gap-6 flex-row">
                <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-20 py-3 rounded-full my-6'>Book a visit</button>
                <button onClick={bookOnlineAppointment} className='bg-primary text-white text-sm font-light px-20 py-3 rounded-full my-6'>Book an online Appointment</button>
                </div>
            </div>
        {/* related doctors */}
        <div>
            <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
        </div>
      </div>
    )
  );
};

export default Appointment;
