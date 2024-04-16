import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs'
import User from '../models/user.js';
import { convertArrayToObject } from '../utils/convertArrayToObject.js';

const asyncHandler = expressAsyncHandler;
// GET /users
export const getUsers = asyncHandler(async (req, res) => {
    try {
        const { fName, lName, mobile, creationDate, email, city, country, activated, blockedByBusiness } = req.query
        const possibleQueries = [{ fName }, { lName }, { mobile }, { creationDate }, { email }, { city }, { country }, { activated }, { blockedByBusiness }]
        const suppliedQueries = convertArrayToObject(possibleQueries);

        const users = await User.find(suppliedQueries).select('-password');
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /users/:id
export const getUserById = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (user) {
            res.status(200).json({ user });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /users
// ...

export const createUser = asyncHandler(async (req, res) => {
    try {
        const { fName, lName, creationDate, activated, password, email, city, mobile } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const expectedEntries = [{ fName }, { lName }, { creationDate }, { activated }, { email }, { city }, { password: hashedPassword }, { mobile }]
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

// PUT /users/:id
export const updateUser = asyncHandler(async (req, res) => {
    try {
        const { fName, lName, creationDate, activated, password, email, city, mobile } = req.body;
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const expectedEntries = [{ fName }, { lName }, { creationDate }, { activated }, { email }, { city }, { password: hashedPassword }, { mobile }]
        const suppliedEntries = convertArrayToObject(expectedEntries)

        const updatedUser = await User.findByIdAndUpdate(req.params.id, suppliedEntries, { new: true });
        res.status(200).json({ user: updatedUser });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /users/:id
export const deleteUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            await user.deleteOne();
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

