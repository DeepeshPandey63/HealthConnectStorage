import React, { useContext, useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { AppContext } from "../contexts/AppContext";
import { toast } from "react-toastify";
import axios from 'axios'
const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const {userData,setUserData,token,backendUrl,loadUserProfileData}=useContext(AppContext);
  const [image,setImage]=useState(false)
  const updateUserProfileData=async ()=>{
    try{
      const formData=new FormData()
      formData.append('name',userData.name)
      formData.append('phone',userData.phone)
      formData.append('address',JSON.stringify(userData.address))
      formData.append('gender',userData.gender)
      formData.append('dob',userData.dob)
      image && formData.append('image',image);

      const {data}=await axios.post(backendUrl+'/api/user/update-profile', formData, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      if(data.success){
        toast.success("updated successfully")
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      }
      else{
        toast.error(data.message)
      }
    }catch(e){
      console.log(e);
      toast.error(e.message);
    }
  }

  return userData && (
    <div className="max-w-lg flex flex-col gap-2 text-sm">

      {
        isEdit ? <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
            <img className="w-36 rounded opacity-75" src={ image ? URL.createObjectURL(image) : userData.image} alt=""></img>
            <img className="w-10 absolute bottom-12 right-12" src={ image ? '' : assets.upload_icon} alt=""></img>
            </div>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" name="" id="image" hidden/>
        </label> :
        <img className="w-36 rounded" src={userData.image} alt="" />
      }

      
      {isEdit === true ? (
        <input
          className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
          type="text"
          value={userData.name}
          onChange={(e) => {
            setUserData((prev) => ({ ...prev, name: e.target.value }));
          }}
        ></input>
      ) : (
        <p className="font-medium text-3xl text-[#262626] mt-4">
          {userData.name}
        </p>
      )}
      <hr className="bg-[#ADADAD] h-[1px] border-none" />
      <div>
        <p className="text-gray-600 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]">
          <p className="font-medium">Email id:</p>
          <p className="text-blue-500">{userData.email}</p>
          <p className="font-medium">Phone:</p>
          <p>
            {" "}
            {isEdit === true ? (
              <input
                className="bg-gray-50 max-w-52"
                type="text"
                value={userData.phone}
                onChange={(e) => {
                  setUserData((prev) => ({ ...prev, phone: e.target.value }));
                }}
              ></input>
            ) : (
              <span className="text-blue-500">{userData.phone}</span>
            )}
          </p>
          <p className="font-medium">Address:</p>
          {isEdit ? (
            <p>
              <input
                className="bg-gray-50"
                type="text"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                value={userData.address.line1}
              />
              <br />
              <input
                className="bg-gray-50"
                type="text"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                value={userData.address.line2}
              />
            </p>
          ) : (
            <p className="text-gray-500">
              {userData.address.line1} <br /> {userData.address.line2}
            </p>
          )}
        </div>
      </div>
      <div>
        <p className="text-[#797979] underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-600">
          <p className="font-medium">Gender:</p>
          {isEdit === true ? (
            <select
              className="max-w-20 bg-gray-50"
              name=""
              id=""
              value={userData.gender}
              onChange={(e) => {
                setUserData((prev) => ({ ...prev, gender: e.target.value }));
              }}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <span className="text-gray-500">{userData.gender}</span>
          )}
          <p className="font-medium">Birthday:</p>
          <p>
            {isEdit ? (
              <input
                type="date"
                className="max-w-28 bg-gray-50"
                onChange={(e) => {
                  setUserData((prev) => ({ ...prev, dob: e.target.value }));
                }}
                value={userData.dob}
              />
            ) : (
              <span className="text-gray-500">{userData.dob}</span>
            )}
          </p>
        </div>
      </div>
      <div className="mt-10">
        {isEdit ? (
          <button
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
            onClick={() => updateUserProfileData()}
          >
            Save Information
          </button>
        ) : (
          <button
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
            onClick={() => setIsEdit(!isEdit)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
