import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/userroutes.js'
import { db } from './config/db.js'
dotenv.config()

let app= express()

db()

//middleware
app.use(express.json())


//base route
app.use("/api/v1/users",userRoutes)



export default app;