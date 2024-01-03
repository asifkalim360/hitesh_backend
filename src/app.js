import express from "express"; 
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express();

// // using cors as a middlewre
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true  
}))
// // all type of data handling configuration with below middlewares.
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended: true, limit:"16kb"}))
app.use(express.static("public"))

// // Handle all this cookies.
app.use(cookieParser())

// // routes import 
import userRouter from "./routes/user.routes.js"; 

// // routes declaration 
app.use("/api/v1/users", userRouter)        //  https://localhost:8000/api/v1/users/------

export {app}