import  express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import jobsRoute from "./routes/job.js"
import {notFound} from "./middleware/not-found.js"

const app = express()
dotenv.config()

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(()=>{
  console.log('Connected to mongodb.');
})
.catch((error)=>{
  console.log(error.reason);
})

//middleware
app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.get('/', (req,res) =>{
  res.send('Welcome to job api')
})

//routes
app.use('/api/users',usersRoute)
app.use('/api/auth', authRoute)
app.use('/api/jobs', jobsRoute)

app.use((err, req, res, next)=>{
  const errorStatus = err.status || 500 
  const errorMessage = err.message || "Something went wrong!"
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  })
})
app.use(notFound)

const port = process.env.PORT || 3000
app.listen(port, console.log(`Server is listening on port ${port}...`))
