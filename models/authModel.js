import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema({
    username:{
       type:String,
       required: [true, 'Must provide First Name'],
       maxlength: [20, 'First Name can not be more than 20 characters']
    },
    password:{
      type:String,
      required: [true, 'Must provide password'],
   },  
   email:{
      type:String,
      unique: true,
      required: [true, 'Must provide Email'],
      maxlength: [20, 'Email can not be more than 30 characters']
   }, 
    isAdmin:{
       type: Boolean,
       default: true,
   },
},
{ timestamps: true })

export default  mongoose.model("Auth", AuthSchema)
