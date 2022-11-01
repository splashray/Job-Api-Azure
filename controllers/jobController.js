import expressAsyncWrapper from "express-async-wrapper"
import Job from "../models/jobModel.js"
import {createError} from '../middleware/error.js'

export const createJob = expressAsyncWrapper( async (req, res, next) =>{
    try {
        const newJob = new Job({
        role: req.body.role,
        location: req.body.location,
        type: req.body.type,
        countOfOpening: req.body.countOfOpening,
        jobDescription: req.body.jobDescription,   
        requiredSkills: req.body.requiredSkills,

        })
        await newJob.save()
        res.status(201).json({response: newJob, message:`New Job Created`})
    } catch (err) {
            next(err)
    }
 
})

export const getAllJob = expressAsyncWrapper( async (req, res) =>{
    const jobs = await Job.find({})
    res.status(200).json({jobs})
})

export const getJob = expressAsyncWrapper(  async (req, res, next) =>{
        const {id:jobID} = req.params
        const job = await Job.findOne({_id:jobID})

        if(!job){
            return next(createError(404, `No Job with id: ${jobID}`))         
        }
            res.status(200).json({job})
})

export const DeleteJob = expressAsyncWrapper( async (req, res,next) =>{
        const {id:jobID} = req.params
        const job = await Job.findOneAndDelete({_id:jobID})

        if(!job){
            return next(createError(404, `No Job with id: ${jobID}`))         
        }
            res.status(200).json({response: job, message:`Job has been Deleted`})
})

export const updateJob = expressAsyncWrapper( async (req, res, next) =>{
        const {id:JobID} = req.params
        const job = await Job.findOneAndUpdate({_id:JobID},req.body,{
            new:true,
            runValidator:true
        })

        if(!job){
            return next(createError(404, `No Job with id: ${JobID}`))         
        }
        res.status(200).json({response: job, message:`Job Info Updated`})
})
