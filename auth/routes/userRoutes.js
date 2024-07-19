import { Router } from "express";
import {signup,login} from '../controllers/userControllers.js'

let userRoutes= Router()

//http://localhost:5000/api/v1/users/signup
userRoutes.post("/signup",signup)

//http://localhost:5000/api/v1/users/login
userRoutes.post("/login",login)

export default userRoutes;