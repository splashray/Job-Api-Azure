import  express  from "express";
import { createJob, DeleteJob, getAllJob, getJob, updateJob } from "../controllers/jobController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../middleware/verifyToken.js";

const router = express.Router()
//create new user information
router.post("/", verifyToken, verifyAdmin, createJob)

//get  job information
router.get("/", getAllJob)

//get particular job information
router.get("/:id", verifyToken, getJob)

//delete all information job 
router.delete("/:id", verifyToken, verifyAdmin, DeleteJob)

//update all information through the body
router.put("/:id", verifyToken, verifyAdmin, updateJob)

export default router
