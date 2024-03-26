import { asyncHandler } from '../utiles/asyncHandler.js'
import {ApiError} from '../utiles/apiErrorHandler.js'
import { User } from '../models/user.model.js'
import { uploadOnCloudinary } from '../utiles/cloudinary.js'
import { ApiResponse } from '../utiles/apiResponse.js'

const registerUser = asyncHandler( async(req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: userName, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return response 

    const {fullName, email, userName, password} = req.body
    console.log('email ', email)

    if([
        fullName, userName, email, password
    ].some((field) => field?.trim() === '')){
        throw new ApiError(400, 'All fields are required')
    }

    const existedUser = User.findOne({
        $or: [{ userName }, { email }]
    })

    if (existedUser){
        throw new ApiError(409, 'User already exists')
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, 'Avatar file is required')
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const covarImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400, 'Avatar file is required')
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        covarImage: covarImage?.url || '',
        email,
        password,
        userName: userName.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        '-password -refreshToken'
    )

    if(!createdUser){
        throw new ApiError(500, 'Something went wrong while registring the user')
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, 'User Registered Successfully')
    )

})

export default registerUser