import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.js";


export const userProtect = asyncHandler( async (req, res, next) => {
    let token;

    token = req.cookies.jwt;

    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            req.user = await User.findById(decoded.userId).select('-password');
            return next();
        } catch (e){
            res.status(401);
            throw new Error('Not authorized, invalid token');
        }
    }

    res.status(401);
    throw new Error('Not authorized, no token');
})
