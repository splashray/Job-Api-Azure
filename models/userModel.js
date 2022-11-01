import mongoose from "mongoose";

const UserInfoSchema = new mongoose.Schema({
   firstname:{
       type:String,
       required: [true, 'Must provide First Name'],
       maxlength: [20, 'First Name can not be more than 20 characters']
    },
    lastname:{
      type:String,
      required: [true, 'Must provide Last Name'],
      maxlength: [20, 'Last Name can not be more than 20 characters']
   },  
   email:{
      type:String,
      unique: true,
      required: [true, 'Must provide Email'],
      maxlength: [20, 'Email can not be more than 30 characters']
   },
   account:{
      type:String,
      // required: [true, 'Must provide an account'],
   },  
   streetName:{
      type:String,
      required: [true, 'Must provide an streetName'],
   },  
   streetNumber:{
      type:Number,
      required: [true, 'Must provide an streetNumber'],
   }, 
   city:{
      type:String,
      required: [true, 'Must provide an city'],
   },  
   country:{
      type:String,
      required: [true, 'Must provide an streetNumber'],
   }, 
   password:{
      type:String,
      required: [true, 'Must provide password'],
   }, 
    access:{
       type: Boolean,
       default: true
    },
},
{ timestamps: true })

export default  mongoose.model("UserInfo", UserInfoSchema)
