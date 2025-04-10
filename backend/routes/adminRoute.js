import express from 'express';
import { addDoctor, adminDashboard, allDoctors, loginAdmin } from '../controller/adminController.js';
import { appointmentsAdmin, appointmentCancel} from '../controller/adminController.js';
import upload from '../middleware/multer.js';
import authAdmin from '../middleware/authAdmin.js'
import {changeAvailability} from '../controller/doctorController.js';
const adminRouter=express.Router();

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor);
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-doctors',authAdmin,allDoctors)
adminRouter.post('/change-availability',authAdmin,changeAvailability)
adminRouter.get('/dashboard',authAdmin,adminDashboard)
adminRouter.get('/appointments',authAdmin,appointmentsAdmin)
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel)
export default adminRouter;