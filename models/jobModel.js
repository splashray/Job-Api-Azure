import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
   role:{
       type:String,
       required: [true, 'Must provide Job Role'],
       maxlength: [30, 'Role can not be more than 30 characters']
    },
   location:{
      type:String,
      required: [true, 'Must provide Job location'],
      maxlength: [30, 'Location can not be more than 30 characters']
   },
   type:{
      type:String,
      required: [true, 'Must provide Job Type'],
      maxlength: [30, 'type can not be more than 30 characters']
   },
   countOfOpening:{
      type:Number,
      required: [true, 'Must provide Job count'],
   },
   jobDescription:{
      type:String,
      required: [true, 'Must provide Job Description'],
   }, 
   requiredSkills:{
      type:String,
      required: [true, 'Must provide job Required Skills'],
   }, 
    availability:{
       type: Boolean,
       default: false
    },
},
{ timestamps: true })

export default  mongoose.model("Job", JobSchema)
