// ✅ OnlineAppointments.jsx
import React, { useContext, useState, useEffect, useCallback } from "react";
import { AppContext } from "../contexts/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../contexts/SocketProvider";

const OnlineAppointments = () => {
  const socket = useSocket();
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
  };

  const checkOnline = (item) => item.isOnline;

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        const onlineAppointments = data.appointments.filter(checkOnline);
        setAppointments([...onlineAppointments].reverse());
      }
    } catch (error) {
      console.error("Error fetching appointments:", error.message);
      toast.error(error.message);
    }
  };

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  const handleSubmitForm = async (userId, uniqueNumber, appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/userData`, { userId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const email = data.userData.email;
      const room = uniqueNumber;
      socket.emit("room:join", { email, room, id: appointmentId });
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      toast.error(error.message);
    }
  };

  const handleAttendance = async (uniqueNumber, userId, appointmentId) => {
    try {
      await handleSubmitForm(userId, uniqueNumber, appointmentId);
    } catch (error) {
      console.error("Error handling attendance:", error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div>
      <div className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        <p>Attend Meetings</p>
      </div>
      <div>
        {appointments.map((item, index) => (
          <div
            className="grid grid-col-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={index}
          >
            <div>
              <img
                className="w-32 bg-[#1Acc82]"
                src={item.docData.image || "path/to/default/image.png"}
                alt={`${item.docData.name}'s profile`}
              />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Address:</p>
              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line2}</p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">Date & Time:</span>{" "}
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-end">
              {!item.cancelled && item.payment && !item.isCompleted && (
                <button
                  onClick={() => handleAttendance(item.uniqueNumber, item.userId, item._id)}
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
              {item.isCompleted && (
                <button className="sm:min-48 py-2 px-4 border border-green-500 rounded text-green-500">
                  Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnlineAppointments;
