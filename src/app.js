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


export {app}