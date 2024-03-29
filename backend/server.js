import express from "express";
import dotenv from 'dotenv'


dotenv.config()
import cookieParser from "cookie-parser";
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
const port = process.env.PORT || 5000
import userRoute from './routes/userRoute.js'
import adminRoutes from './routes/adminRoute.js';


connectDB()
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.static('backend/public'));




app.use('/api/users',userRoute)
app.use('/api/admin', adminRoutes);


app.get('/',(req,res)=>{
    res.send("server is ready")
}) 


// app.use(notFound)
app.use(errorHandler)  
 

app.listen(port,()=>{
    console.log(`server connect in port: ${port}`);
})      



