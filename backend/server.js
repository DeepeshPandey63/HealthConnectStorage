import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import userRouter from './routes/userRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import appointmentModel from './model/appointmentModel.js'; 
import { Server } from 'socket.io';
const io = new Server(2000, {
    cors: true,
  });






  const emailToSocketIdMap = new Map();
  const socketidToEmailMap = new Map();
  
  io.on("connection", (socket) => {
    console.log(`Socket Connected`, socket.id);
    socket.on("room:join", (data) => {
      console.log(`room joined`, data);
      const { email, room, id } = data;
      emailToSocketIdMap.set(email, socket.id);
      socketidToEmailMap.set(socket.id, email);
      console.log(socket.id)
      io.to(room).emit("user:joined", { email, id:socket.id,appointmentId:id });
      socket.join(room);
      io.to(socket.id).emit("room:join", data);
    });
  
    socket.on("user:call", ({ to, offer,appointmentId }) => {
      io.to(to).emit("incomming:call", { from: socket.id, offer ,appointmentId});
    });
  
    socket.on("call:accepted", ({ to, ans,appointmentId }) => {
      io.to(to).emit("call:accepted", { from: socket.id, ans,appointmentId });
    });
    socket.on("make-completed", async ({ appointmentId }) => {
      if (!appointmentId) return;
    
      try {
        await appointmentModel.findByIdAndUpdate(
          appointmentId,
          { isCompleted: true },
          { new: true }
        );
      } catch (err) {
        // Silently fail
      }
    });
    
    socket.on("peer:nego:needed", ({ to, offer }) => {
      console.log("peer:nego:needed", offer);
      io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
    });
  
    socket.on("peer:nego:done", ({ to, ans }) => {
      console.log("peer:nego:done", ans);
      io.to(to).emit("peer:nego:final", { from: socket.id, ans });
    });
  });
  








const app=express();
const port=process.env.PORT||4000;
connectDB();
connectCloudinary();

//middlewares
app.use(express.json());
app.use(cors());

//api endpoints
app.use('/api/admin',adminRouter);
app.use('/api/user',userRouter);

app.use('/api/doctor',doctorRouter)
//api endpoints 
app.get('/' ,(req,res)=>{
    res.send('Api Working');
})

app.listen(port,()=>{console.log(`server started at PORT :${port}`)})