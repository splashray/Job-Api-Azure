import  express  from "express";
import { login, register, UserRegister, UserLogin} from "../controllers/authController.js";

const router = express.Router()

// router for admin registration
router.post("/register", register)
router.post("/login", login)

// router for user login
router.post("/registeruser", UserRegister)
router.post("/loginuser", UserLogin)

export default router