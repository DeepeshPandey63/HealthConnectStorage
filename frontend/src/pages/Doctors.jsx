import React, { useEffect ,useState, useContext} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { AppContext } from '../contexts/AppContext'
const Doctors = () => {
  const {speciality} = useParams();
  const [filterDoc,setFilterDoc]=useState([]);
  const [showFilter,setShowFilter]=useState(false);
  const {doctors}=useContext(AppContext);
  const navigate=useNavigate();
  const applyFilter=()=>{
    if(speciality){
      setFilterDoc(doctors.filter(doc=>doc.speciality===speciality));
    }else{
      setFilterDoc(doctors);
    }
  }
  useEffect(() => {
    applyFilter();
  }, [speciality,doctors])

  return (
    <div >
      <p className='text-gray-600 mt-4'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter?'bg-primary text-white':''}`} onClick={()=>{setShowFilter(!showFilter)}}>Filters</button>
        <div className={` ${showFilter?'flex':'hidden sm:flex'} flex-col gap-4 text-sm text-gray-600 `}>
          <p onClick={()=> speciality === 'General physician' ? navigate('/doctors/') : navigate('/doctors/General physician ')}className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='General physician' ? 'bg-indigo-100 text-black' :''}`}>General physician</p>
          <p onClick={()=> speciality === 'Gynecologist' ? navigate('/doctors/') : navigate('/doctors/Gynecologist')}className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Gynecologist' ? 'bg-indigo-100 text-black' :''}`}>Gynecologist</p>
          <p onClick={()=> speciality === 'Dermatologist' ? navigate('/doctors/') : navigate('/doctors/Dermatologist')}className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Dermatologist' ? 'bg-indigo-100 text-black' :''}`}>Dermatologist</p>
          <p onClick={()=> speciality === 'Pediatricians' ? navigate('/doctors/') : navigate('/doctors/Pediatricians')}className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Pediatricians' ? 'bg-indigo-100 text-black' :''}`}>Pediatricians</p>
          <p onClick={()=> speciality === 'Neurologist' ? navigate('/doctors/') : navigate('/doctors/Neurologist')}className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Neurologist' ? 'bg-indigo-100 text-black' :''}`}>Neurologist</p>
          <p onClick={()=> speciality === 'Gastroenterologist' ? navigate('/doctors/') : navigate('/doctors/Gastroenterologist')}className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Gastroenterologist' ? 'bg-indigo-100 text-black' :''}`}>Gastroenterologist</p>
        </div>
      
      <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5  gap-4 gap-y-6'>
        {
          filterDoc.map((item, index) => (
            <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                <img className='bg-[#92dbad]' src={item.image} alt="" />
                <div className='p-4'>
                    <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : "text-gray-500"}`}>
                        <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500"}`}></p><p>{item.available ? 'Available' : "Not Available"}</p>
                    </div>
                    <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
                    <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
                </div>
            </div>
        ))
        }
      </div>
    </div>
    </div>
  )
}

export default Doctors