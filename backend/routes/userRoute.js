import express from 'express';
import { registerUser,userLogin,getProfile,updateProfile, bookAppointment, listAppointment, cancelAppointment,paymentRazorpay,verifyRazorpay,bookOnlineAppointment,userData, modifyAppointmentStatus} from '../controller/userController.js';
import authUser from '../middleware/authUser.js';
import upload from '../middleware/multer.js';
const userRouter=express.Router();

userRouter.post("/register", registerUser)
userRouter.post("/login",userLogin);
userRouter.get('/get-profile',authUser,getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.post('/book-online-appointment',authUser,bookOnlineAppointment)
userRouter.get('/appointments',authUser,listAppointment)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)
userRouter.post('/payment-razorpay',authUser,paymentRazorpay)
userRouter.post('/verifyRazorpay',authUser,verifyRazorpay)
userRouter.post('/userData',authUser,userData)
userRouter.post('/modify-appointment-status',authUser,modifyAppointmentStatus)
export default userRouter;     