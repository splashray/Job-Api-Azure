import  bcrypt from "bcryptjs";
import  jwt from "jsonwebtoken";
import expressAsyncWrapper from "express-async-wrapper"
import Auth from "../models/authModel.js"
import UserInfo from "../models/userModel.js"
import {createError} from '../middleware/error.js'

export const register  = expressAsyncWrapper(async (req, res, next)=>{
    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new Auth({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })
        await newUser.save()
        res.status(200).send("Authorized Admin has been created.")
    } catch (err) {
            next(err)
    }
})

export const login  = async (req, res, next)=>{
    try {
        const  user = await Auth.findOne({email: req.body.email}) 
        if(!user) return next(createError(404, "User not found"))

        const  isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect) return next(createError(400, "Wrong password or Email!"))

         const token = jwt.sign(
            {id: user._id, isAdmin: user.isAdmin},
            process.env.JWT_SECRET
         )

        const {password, isAdmin, ...otherDetails } = user._doc
        res
        .cookie("access_token", token, {
            httpOnly: true,
        })
        .status(200)
        .json({...otherDetails})
    } catch (err) {
        next(err)
    }
} 

export const UserRegister = expressAsyncWrapper( async (req, res, next) =>{
    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new UserInfo({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            account: req.body.account,   
            streetName: req.body.streetName,
            streetNumber: req.body.streetNumber,
            city: req.body.city,
            country: req.body.country,
            password: hash,
        })
        await newUser.save()
        res.status(201).json({response: newUser, message:`User Account Created`})
    } catch (err) {
            next(err)
    }
 
})

export const UserLogin  = async (req, res, next)=>{
    try {
        const  user = await UserInfo.findOne({email: req.body.email}) 
        if(!user) return next(createError(404, "User not found"))

        const  isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect) return next(createError(400, "Wrong password or Email!"))

         const token = jwt.sign(
            {id: user._id, access: user.access},
            process.env.JWT_SECRET
         )

        const {password, access, ...otherDetails } = user._doc
        res
        .cookie("access_token", token, {
            httpOnly: true,
        })
        .status(200)
        .json({...otherDetails})
    } catch (err) {
        next(err)
    }
} 

