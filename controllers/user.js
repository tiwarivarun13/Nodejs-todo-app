import { User } from "../models/user.js"
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/features.js"

export const getAllUsers = async (req, res,next) => { }
export const register = async (req, res,next) => {
   try {
    const { name, email, password } = req.body
    let user = await User.findOne({ email })
    if (user)
        return res.status(404).json({
            success: false,
            message: "User already registered"
        })

    const hashPassword =await bcrypt.hash(password,10);

   user= await User.create({ name, email,password:hashPassword })

   sendCookie( user,res,"Registered Succesfully",201)
   } catch (error) {
    next(error);
   }
    
}
export const login = async (req, res,next) => {
   try {
    const {email,password} = req.body
    let user = await User.findOne({ email}).select("+password")

    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch)
    return res.status(404).json({
            success: false,
            message: "Invalid username or password"
        })
    sendCookie(user,res,`Welcome back, ${user.name}`,200)
   } catch (error) {
    next(error)
   }

 }
export const getMyProfile =  (req, res) => { 
    res.status(200).json({
        success: true,
        user:req.user
    })
}
export const logout =  (req, res) => { 
    res.status(200).cookie("token","",{ 
        expires:new Date(Date.now()),
        sameSite:process.env.NODE_ENV==="Development"?"lax" :"none",
        secure:process.env.NODE_ENV==="Development"?false : true,
    })
    .json({
        success: true,
        message:"Logout "
    })
}
