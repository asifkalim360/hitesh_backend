import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const registerUser = asyncHandler( async (req, res) => {
    // res.status(200).json({message:"OK"});
    /* 
    //////// IMPORTANT WORK LIST IN THIS CONTROLLER ////////
    // (1) get user details from frontend 
    // (2) validation - not empty 
    // (3) check if user already exists: username, email 
    // (4) check for images, check for avatar 
    // (5) upload them to cloudinary, avatar 
    // (6) create user object - create entry in database(mongoDB) 
    // (7) remove password and refresh token field from response 
    // (8) check for user creation 
    // (9) return response 
    */

    // // CODE STARTED HERE!!!
    // STEP:(1) get user details from frontend 
    const {username, email, fullname, password} = req.body 
    console.log({email:email}); 
    //------------------------------------------------------------------------------------------

    // STEP:(2) validation - not empty 
    /*
    // // Single single sabko validate kar sakte hain.
    // if(username === "") {
    //     throw new ApiError(400, "username is required")
    // }
    // if(email === "") {
    //     throw new ApiError(400, "email is required")
    // }
    // if(fullname === "") {
    //     throw new ApiError(400, "FullName is required")
    // }
    // if(password === "") {
    //     throw new ApiError(400, "password is required")
    // }
    */ 

    // // sabko ek sat bhi validate kar sakte hain. 
    if([fullname, email, username, password].some((field) => field?.trim() ===""))    // All fields are check in a function
    {
        throw new ApiError(400, "All fields are required")
    }
    //------------------------------------------------------------------------------------------------------------------------

    // STEP:(3) check if user already exists: username, email 
    const existedUser = await  User.findOne({                       //check if username or email are exists!!!
        $or: [{username}, {email}]
    })
    
    if(existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    //-----------------------------------------------------------------------------------------------------------------------

    // STEP:(4) check for images, check for avatar  
    const avatarLocalPath = req.files?.avatar[0]?.path;          // avatar image local server path
    const coverImageLocalPath = req.files?.coverImage[0]?.path;  // coverImage image local server path
    
    if(!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }
    //----------------------------------------------------------------------------------------------------------------------

    // STEP:(5) upload them to cloudinary, avatar 
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if(!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }
    //-------------------------------------------------------------------------------------------------------------------------------
    
    // STEP:(6) create user object - create entry in database(mongoDB) 
    
    const user = await User.create({
        fullname, 
        email, 
        password, 
        username: username.toLowerCase(), 
        avatar: avatar.url, 
        coverImage: coverImage?.url || "",
    })
    //--------------------------------------------------------------------------------------------------------------------------------

    // STEP:(7) remove password and refresh token field from response 
    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    //--------------------------------------------------------------------------------------------------------------------------------

    // STEP:(8) check for user creation 
    if(!createdUser) {
        throw new ApiError(500, "Something went wrong while registering  the user")
    }
    //-----------------------------------------------------------------------------------------------------------------

    // STEP:(9) return response 
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully!!!")        // ek banaya hai humlogo ne (new ApiResponse)
    )
})


ApiResponse
export {registerUser}
