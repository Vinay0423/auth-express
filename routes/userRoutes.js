import { Router } from "express";
import {signup,login} from '../controllers/userControllers.js'
import { auth } from "../middleware/auth.js";

let userRoutes= Router()

//http://localhost:5000/api/v1/users/signup
userRoutes.post("/signup",signup)

//http://localhost:5000/api/v1/users/login
userRoutes.post("/login",login)


userRoutes.get("/home",auth,(req,res,next)=> {
    res.send(`Welcome  ${req.user.name}`)
})


export default userRoutes;