import  express  from "express";
import {  DeleteUser, getAllUser, getUser, updateUser, updateUserPassword } from "../controllers/userController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../middleware/verifyToken.js";

const router = express.Router()

//get users information
router.get("/", verifyToken, verifyAdmin, getAllUser)

//get particular user information
router.get("/:id", verifyToken, verifyAdmin, getUser)

//delete all information user 
router.delete("/:id", verifyToken, verifyAdmin, DeleteUser)

//update all information excluding password through the body
router.put("/:id", verifyToken, updateUser)

//update the password through the body
router.put("/pass/:id", verifyToken, updateUserPassword)


export default router