import jwt  from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async(req, res, next) => {
    // Get token from http-only cookie
    const token = req.cookies.jwt;

    if(token){
        try{
            // Verify token
            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

            // Find and set user using decoded token user data (without password)
            req.user = await User.findById(decodedToken.userID).select('-password');
            
            next();
        } catch (err){
            res.status(401);
            throw new Error("Not authorized, invalid token");
        }
    } else {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

export default protect;