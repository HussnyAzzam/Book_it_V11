import expressAsyncHandler from 'express-async-handler';
import User from '../models/user.js';
import AdminUser from '../models/AdminUser.js';
import { convertArrayToObject } from '../utils/convertArrayToObject.js';
import generateToken from '../utils/generateToken.js';

const asyncHandler = expressAsyncHandler;

// POST /sign-up
export const signUp = asyncHandler(async (req, res) => {
    try {
        const { fName, lName, creationDate, activated, password, email, city, country, mobile } = req.body;

        const expectedEntries = [{ fName }, { lName }, { creationDate }, { activated }, { email }, { city }, { country }, { password }, { mobile }]
        const suppliedEntries = convertArrayToObject(expectedEntries)
        // Create a new user instance
        const user = new User(suppliedEntries);
        user.id = `U${user._id}`

        // Save the user to the database
        const savedUser = await user.save();

        savedUser.password = undefined;

        res.status(201).json({ user: savedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /sign-in
export const signIn = asyncHandler(async (req, res) => {
    try {
        const { mobile, password, email } = req.body;

        const expectedEntries = [{ mobile }, { email }]
        const suppliedEntries = convertArrayToObject(expectedEntries)

        const user = await User.findOne(suppliedEntries);
    
        if (user && (await user.matchPassword(password))) {
            user.password = undefined;
            generateToken(res, user._id, false)
            res.status(200).json({ message: 'sign in successful', user });
        } else {
            res.status(404).json({ error: 'Incorrect details' });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /admin/sign-up
export const adminSignUp = asyncHandler(async (req, res) => {
    try {
        const { contact, businessId, email, mobile, password, active } = req.body;

        const expectedEntries = [{ contact }, { businessId }, { email }, { mobile }, { password }, { active }, { password }]
        const suppliedEntries = convertArrayToObject(expectedEntries)
        // Create a new adminUser instance
        const adminUser = new AdminUser(suppliedEntries);
        adminUser.id = `D${adminUser._id}`

        // Save the adminUser to the database
        const savedAdminUser = await adminUser.save();
        savedAdminUser.password = undefined;

        res.status(201).json({ message: "Admin sign up successful", adminUser: savedAdminUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /admin/sign-in
export const adminSignIn = asyncHandler(async (req, res) => {
    try {
        const { email, mobile, password } = req.body;

        const expectedEntries = [{ email }, { mobile }]
        const suppliedEntries = convertArrayToObject(expectedEntries)
        // Create a new adminUser instance
        const adminUser = await AdminUser.findOne(suppliedEntries);

        if (adminUser && (await adminUser.matchPassword(password))){
            adminUser.password = undefined;
            generateToken(res, adminUser._id, true)
            res.status(200).json({ message: "Admin sign in successful", adminUser });
        }
        else
            res.status(404).json({ error: 'Incorrect details' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});