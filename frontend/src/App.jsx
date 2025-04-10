import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors';
import About from './pages/About';
import Login from './pages/Login';
import Contact from './pages/Contact';
import MyAppointments from './pages/MyAppointments';
import MyProfile from './pages/MyProfile';
import Appointment from './pages/Appointment';
import Navbar from './components/Navbar';
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import OnlineAppointments from './pages/OnlineAppointments';
import Room from './pages/Room';
const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/doctors" element={<Doctors/>}/>
        <Route path='/doctors/:speciality' element={<Doctors/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/my-appointments' element={<MyAppointments/>}/>
        <Route path='/online-appointments' element={<OnlineAppointments/>}/>
        <Route path='/my-profile' element={<MyProfile/>}/>
        <Route path ='/appointment/:docId' element={<Appointment/>}/>
        <Route path='/room/:uniqueNumber' element={<Room/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}
export default App;