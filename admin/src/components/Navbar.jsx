import {React,useContext,}from 'react'
import { assets } from '../assets/assets'
import {AdminContext} from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
const Navbar = () => {
    const {aToken,setAToken}=useContext(AdminContext);
    const {dToken,setDToken}=useContext(DoctorContext);
    const navigate=useNavigate();
    const logout=()=>{
      navigate('/')
      aToken && setAToken('');
      aToken && localStorage.removeItem('aToken');
      dToken && setDToken('');
      dToken && localStorage.removeItem('dToken');
    }
  return (
    <div className='flex justify-between items-center px-4 sm:px-10 border-b bg-white'>
        <div className='flex items-center gap-2'>
            <div className="flex items-center ">
                    <img
                      className="cursor-pointer w-32"
                      src={assets.logo2}
                      alt=""
                    />
                    <div className='flex flex-col'>
                        <span className="text-2xl font-bold">Health Connect</span>
                        { aToken? <span className='text-sm font-medium text-gray-900'> Admin Dashboard</span> : <span className='text-sm font-medium text-gray-900'> Doctor Dashboard</span>}
                    </div>
                  </div>   
            <p className='mt-[-14px] text-sm border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-500 font-medium' >{aToken ? 'Admin' : 'Doctor'}</p>
        </div>
        <button onClick={logout} className='bg-primary text-white text-sm px-10 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar