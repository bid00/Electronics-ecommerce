import express from "express";
import { changePassword, getProfile, updateProfile ,getUserAddresses} from "../controllers/userController.js";
import upload from "../middlewares/upload.js";
const router = express.Router();

// Get Profile
router.get('/profile',getProfile);

// Update Profile
router.patch('/updateprofile',upload.single("picture"),updateProfile);

// change Password
router.patch('/changepassword',changePassword);

router.get('/addresses',getUserAddresses);
export default router;