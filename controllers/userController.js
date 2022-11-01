import  bcrypt from "bcryptjs";
import expressAsyncWrapper from "express-async-wrapper"
import UserInfo from "../models/userModel.js"
import {createError} from '../middleware/error.js'

export const getAllUser = expressAsyncWrapper( async (req, res) =>{
    const users = await UserInfo.find({})
    res.status(200).json({users})
})

export const getUser = expressAsyncWrapper(  async (req, res, next) =>{
        const {id:UserID} = req.params
        const user = await UserInfo.findOne({_id:UserID})

        if(!user){
            return next(createError(404, `No User with id: ${UserID}`))         
        }
            res.status(200).json({user})
})

export const DeleteUser = expressAsyncWrapper( async (req, res,next) =>{
        const {id:UserID} = req.params
        const user = await UserInfo.findOneAndDelete({_id:UserID})

        if(!user){
            return next(createError(404, `No User with id: ${UserID}`))         
        }
            res.status(200).json({response: user, message:`User has been Deleted`})
})

export const updateUser = expressAsyncWrapper( async (req, res, next) =>{
        const {id:UserID} = req.params
        const user = await UserInfo.findOneAndUpdate({_id:UserID},req.body,{
            new:true,
            runValidator:true
        })

        if(!user){
            return next(createError(404, `No User with id: ${UserID}`))         
        }
        res.status(200).json({response: user, message:`User Info Updated`})
})

export const updateUserPassword = expressAsyncWrapper( async (req, res, next) =>{
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.npassword, salt)

    const user = await UserInfo.findById(req.params.id)
    if(!user){ 
        res.status(401).send({ message: 'User Not Found',})
    }else{
        const  isPasswordCorrect = await bcrypt.compare(req.body.opassword, user.password)
        if(!isPasswordCorrect){
             res.status(400).send({ message: 'Old Password is wrong!'})
        }else{
         user.password =  hash || user.password 
        const updatedUser = await user.save()
        res.status(200).json({response: updatedUser, message:`User Password Updated`})
        }
    }
})

