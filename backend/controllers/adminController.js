import asyncHandler from "express-async-handler";
import Admin from  '../models/adminModel.js'
import generateAdminToken from '../util/adminToken/generateAdminToken.js'
import { fetchUser,updateUser,deleteUser } from "../util/adminHelpers/adminHelpers.js";

const authAdmin = asyncHandler(async(req,res)=>{
    
    const {email,password} = req.body

    if(!email || !password ){
        res.status(401)
        throw new Error(" email or pass word is missing in req, authentication failed")
    }
    const admin = await Admin.findOne({email : email})
    let passwordValid = false;
    if(admin){
        passwordValid = await admin.matchPassword(password)
    }
    if(passwordValid){
        generateAdminToken(res,admin._id)

        const registeredAdmin = {
            name : admin.name,
            email: admin.email
        }
        
        res.status(201).json(registeredAdmin)
    }
    
    if(!admin || !passwordValid){
        res.status(401)
        throw new Error('Invalid Email or Password, Admin authentication failed.');

    }
})


const registerAdmin = asyncHandler( async(req,res) =>{


    const {name,email,password,adminRegistrationKey} = req.body

    
    if(!email || !password){
        res.status(401)
        throw new Error('Email or Password is missing in the request, Admin registration failed.')
    }
    if(!adminRegistrationKey){
        res.status(401)
        throw Error("no admin registration key, registration failed")
    }
    if(process.env.ADMIN_REG_KEY !== adminRegistrationKey){
        res.status(401)
        throw Error("invalid admin registration key , registration failed")
    }

    const adminExists = await Admin.findOne({email:email})
    if(adminExists){
        res.status(401)
        throw new Error("user already exists")
    }
    const admin = await Admin.create({
        name:name,
        email:email,
        password:password
    })

    if(admin){
        generateAdminToken(res,admin._id)
    

    const registeredAdminData = {
        name:admin.name,
        email: admin.email,
    }
    res.status(201).json(registeredAdminData);

    }else{
        res.status(400);

        throw new Error('Invalid user data, User registration failed.');
    }
    

})
const logoutAdmin = asyncHandler( async (req,res)=>{
    res.cookie('jwtAdmin','',{
      httpOnly:true,
      expires: new Date(0)
  })
  res.status(200).json({message:"User Logged Out"})
})

  const getAdminProfile = asyncHandler ( async (req, res) => {

    /*
     # Desc: Get user profile
     # Route: GET /api/admin/profile
     # Access: PRIVATE
    */

    const user = {

        name: req.user.name,
        email: req.user.email

    }

    res.status(200).json({user});

});

const updateAdminProfile = asyncHandler ( async (req, res) => {

    /*
     # Desc: Update user profile
     # Route: PUT /api/admin/profile
     # Access: PRIVATE
    */

    // Find the user data with user id in the request object
    const admin = await AdminModel.findById(req.user._id);

    if (admin) {
    
        // Update the user with new data if found or keep the old data itself.
        admin.name = req.body.name || admin.name;
        admin.email = req.body.email || admin.email;

        // If request has new password, update the user with the new password
        if (req.body.password) {

            admin.password = req.body.password
        
        }

        const updatedAdminData = await admin.save();

        // Send the response with updated user data
        res.status(200).json({

            name: updatedAdminData.name,
            email: updatedAdminData.email

        });

    } else {

        res.status(404);

        throw new Error("Requested Admin not found.");

    };

});

const getAllUsers = asyncHandler(async (req, res) => {

    const usersData = await fetchUser();

    if(usersData){

        res.status(200).json({ usersData });

    }else{

        res.status(404);

        throw new Error("Users data fetch failed.");

    }

});

const deleteUserData = asyncHandler( async (req, res) => {

    const userId = req.body.userId;

    const usersDeleteStatus = await deleteUser(userId);

    if(usersDeleteStatus.success){

        const response = usersDeleteStatus.message;

        res.status(200).json({ message:response });

    }else{

        res.status(404);

        const response = usersDeleteStatus.message;

        throw new Error(response);

    }

});


const updateUserData = asyncHandler( async (req, res) => {

    const userId = req.body.userId;
    const name = req.body.name;
    const email = req.body.email;

    if(!userId){

        res.status(404);;

        throw new Error("UserId not received in request. User update failed.");

    }

    const userData = {userId: userId, name: name, email: email};

    const usersUpdateStatus = await updateUser(userData);

    if(usersUpdateStatus.success){

        const response = usersUpdateStatus.message;

        res.status(200).json({ message:response });

    }else{

        res.status(404);;

        throw new Error("User update failed.");

    }

});


export {

    authAdmin,
    registerAdmin,
    logoutAdmin,
    getAdminProfile,
    updateAdminProfile,
    getAllUsers,
    deleteUserData,
    updateUserData

};