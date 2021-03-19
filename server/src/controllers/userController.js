import mongoose from "mongoose";
import  bcrypt from "bcryptjs" //mã hoá mật khẩu
import jwt from "jsonwebtoken" // sử dụng token

import User from "../models/user.js";

export const signIn = async (req, res) => {
    const {email, password} = req.body
    try {
        //check có tồn tại email
        const existingUser = await User.findOne({email})
        console.log('file: userController.js > line 12 > signIn > existingUser', existingUser)
        if(!existingUser) return res.status(404).json({message:"User doesn't exist."})

        //giải mã hoá mật khẩu
        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password)
        console.log('file: userController.js > line 17 > signIn > isPasswordCorrect', isPasswordCorrect)
        //mật khẩu không hợp lệ
        if(!isPasswordCorrect) return res.status(400).json({message:"Invalid credentials"})
        
        //trường hợp hợp lệ
        const token = jwt.sign({email:existingUser.email, id:existingUser._id}, "test", {expiresIn: "1h"})

        res.status(200).json({result: existingUser, token})
    
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
        
    }
}

export const signUp = async(req, res) => {
    
    const {email, password, confirmPassword, firstName, lastName} = req.body
   
    try {
        //check email đã tồn tại hay chưa
        const existingUser = await User.findOne({email})
        if(existingUser) return res.status(400).json({message:"User already exists."})
        
        if(password !== confirmPassword) return res.status(400).json({message:"Password don't match."})

        //mã hoá mật khẩu
        const hashedPassword = await bcrypt.hash(password,12)
        
        const result = await User.create({email, password:hashedPassword, name:`${firstName} ${lastName}`})
       
        //trường hợp hợp lệ
        const token = jwt.sign({email:result.email, id:result._id}, "test", {expiresIn: "1h"})
        res.status(200).json({result, token})

    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
        
    }
}