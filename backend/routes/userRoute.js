import express from 'express'
import { authUser,updateUser,logoutUser,getUserProfile,registerUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { multerUploadUserProfile } from '../config/multerConfig.js';

const router = express.Router();
router.post('/',registerUser)
router.post('/auth',authUser)
router.post('/logout',logoutUser)
router.post('/register',registerUser)
router.route('/profile')
    .get(protect, getUserProfile) // GET endpoint to retrieve user profile
    .put(protect, multerUploadUserProfile.single('profileImage'), updateUser); // PUT endpoint to update user profile


export default router 