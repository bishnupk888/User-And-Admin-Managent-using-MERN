import AsyncHandler from "express-async-handler"
 import User from "../models/userModel.js"
 import generateToken from "../util/generateToken.js"

//auth user
const authUser = AsyncHandler(async(req,res)=>{
    const {email,password} =req.body

    const user = await User.findOne({email:email})
    if(user && (await user.matchPasswords(password))){
       generateToken(res,user._id)

       let registeredUserData = {
        _id: user._id,
        name: user.name,
        email: user.email
    }

    if(user.profilePicture){

        registeredUserData.profilePicture = user.profilePicture;
        
    }
        res.status(201).json(registeredUserData)
        }else{
            res.status(401)
            throw new Error('invalid email or password')
        }
})

//register user
const registerUser = AsyncHandler(async(req,res)=>{ 
    const {name,email,password} = req.body
   
const userExists = await User.findOne({email:email})
if(userExists){
    res.status(400)
    throw new Error('User already exists')
}



const user = await User.create({
    name,
    email,
    password
})

if(user){
    generateToken(res,user._id)
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email
    })
}else{
    res.status(400)
    throw new Error('invalid user data')
}

})

//logout user

const logoutUser = AsyncHandler(async(req,res)=>{
  res.cookie('jwt','',{
    httpOnly:true,
    expires: new Date(0)
})
res.status(200).json({message:"User Logged Out"})
})

const getUserProfile = AsyncHandler(async(req,res)=>{
    const user = {
        _id:req.user._id,
        name: req.user.name,
        email: req.user.email,
        profilePicture:req.user.profilePicture
    }
    
    res.status(200).json({user})
})

const updateUser = AsyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id)

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        
        // Check if password is provided in request body
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }

        // Check if file is uploaded and update profile picture
        if (req.file) {
            user.profilePicture = req.file.filename || user.profilePicture;
        }
        
        const updatedUser = await user.save();
       
        res.status(200).json({
            _id : updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            profilePicture: updatedUser.profilePicture
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export{
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUser
}