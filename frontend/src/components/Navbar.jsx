import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AppContext } from "../contexts/AppContext";
const Navbar = () => {
  const {token ,setToken,userData}=useContext(AppContext)
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);


  const logout=()=>{
    setToken('')
    localStorage.removeItem('token')
    navigate('/');
  }



  return (
    <div
      className="flex items-center justify-between text-sm border-b border-b-gray-400 font-montserratAlt"
      style={{ color: "0c7066" }}
    >
      <div className="flex items-center">
        <img
          onClick={() => navigate("/")}
          className="cursor-pointer w-32"
          src={assets.logo2}
          alt=""
        />

        <span className="text-2xl font-bold">Health Connect</span>
      </div>
      <ul className="hidden md:flex items-start gap-5 font-medium ">
        <NavLink to="/">
          <li className="mx-2 py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 w-3/5 m-auto hidden bg-primary" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="mx-2 py-1">ALL DOCTORS</li>
          <hr className="border-none outline-none h-0.5 w-3/5 m-auto hidden bg-primary" />
        </NavLink>
        <NavLink to="/about">
          <li className="mx-2 py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 w-3/5 m-auto hidden bg-primary" />
        </NavLink>
        <NavLink to="/contact">
          <li className="mx-2 py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 w-3/5 m-auto hidden bg-primary" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {" "}
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={userData.image} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-10 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => {
                    navigate("/my-profile");
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <hr />
                <p
                  onClick={() => {
                    navigate("/my-appointments");
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <hr />
                <p
                  onClick={() => {
                    navigate("/online-appointments");
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  Attend Online Appointment
                </p>
                <hr />
                <p
                  onClick={logout}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="bg-primary text-white px-8 py-3 rounded-full font-bold hidden md:block"
          >
            Create Account
          </button>
        )}
        <img
          className="w-6 md:hidden"
          onClick={() => setShowMenu(true)}
          src={assets.menu_icon}
          alt=""
        />
        {/* mobile menu */}
        <div
          className={` ${
            showMenu ? "fixed w-1/2" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <div className="flex items-center w-36">
              <img
                
                onClick={() => navigate("/")}
                className="cursor-pointer w-32"
                src={assets.logo2} 
                
                alt=""
              />

              <span className="text-2xl  font-bold">Health Connect</span>
            </div>
            <img className="w-7"
              onClick={() => {
                setShowMenu(false);
              }}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font font-medium">
            <NavLink onClick={()=>setShowMenu(false)}  to='/'><p className='px-4 py-2 rounded inline-block text-gray-800'>HOME</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)}  to='/doctors'><p className='px-4 py-2 rounded inline-block  text-gray-800' >ALL DOCTORS</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block  text-gray-800'>ABOUT</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)}  to='/contact'><p className='px-4 py-2 rounded inline-block  text-gray-800'>CONTACT</p></NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
