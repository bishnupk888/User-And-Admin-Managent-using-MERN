import asyncHandler from "express-async-handler";
import jwt, { decode } from "jsonwebtoken";
import User from "../models/userModel.js";


const protect = asyncHandler(async(req,res,next)=>{
    let token 
    token = req.cookies.jwt
    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select('-password')
            next()
        }catch(error){
           res.status(401)
           throw new Error('Unauthorised, invalid token') 
        }
    }else{
        res.status(400)
        throw new Error('Unauthorised, no token')
    }
})


export {protect}