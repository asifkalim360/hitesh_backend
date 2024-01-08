import { Router } from "express";                                           // import express !!!
import { loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user.controller.js";           // import registerUser function from controller !!!
import { upload } from "../middlewares/multer.middleware.js";               // import Multer(file upload) from middleware folder!!!
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();                                                    // create router object!!!

//REGISTRATION ROUTE
router.route("/register").post(                                             //create router with help of route method!!!
        upload.fields([
            {
                name: "avatar", 
                maxCount: 1
            }, 
            {
                name: "coverImage",
                maxCount: 1
            }
        ]),
        registerUser,
) 

//LOGIN ROUTE 
router.route("/login").post(loginUser)

//LOGOUT ROUTE ---> //SECURE ROUTES
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)




export default router;