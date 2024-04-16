import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs'
import AdminUser from '../models/AdminUser.js'
import { convertArrayToObject } from '../utils/convertArrayToObject.js';

const asyncHandler = expressAsyncHandler;
// GET /adminUser
export const getAdminUsers = asyncHandler(async (req, res) => {
    
    try {
        const { contact, businessId, email, mobile, active, country } = req.query;
        const expectedQueries = [{contact}, {businessId}, {email}, {mobile}, {active}, {country}]
        const suppliedQueries = convertArrayToObject(expectedQueries) || {}
        const adminUsers = await AdminUser.find(suppliedQueries).select('-password');
        res.status(200).json({ adminUsers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /adminUser/:id
export const getAdminUserById = asyncHandler(async (req, res) => {
    try {
        const adminUser = await AdminUser.findById(req.params.id).select('-password');
        if (adminUser) {
            res.status(200).json({ adminUser });
        } else {
            res.status(404).json({ error: 'AdminUser not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /adminUser
// ...

export const createAdminUser = asyncHandler(async (req, res) => {
    try {
        const { contact, businessId, email, mobile, password, active } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password || '', salt);
        const expectedEntries = [{contact}, {businessId}, {email}, {mobile}, {active}, {password: hashedPassword}]
        const suppliedEntries = convertArrayToObject(expectedEntries)
        // Create a new adminUser instance
        const adminUser = new AdminUser(suppliedEntries);
        adminUser.id = `D${adminUser._id}`

        // Save the adminUser to the database
        const savedAdminUser = await adminUser.save();
        savedAdminUser.password = undefined;

        res.status(201).json({ adminUser: savedAdminUser });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
});

// PUT /adminUser/:id
export const updateAdminUser = asyncHandler(async (req, res) => {
    try {
        const { contact, businessId, email, mobile, password, active } = req.body;
        const adminUser = await AdminUser.findById(req.params.id);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const expectedEntries = [{contact}, {businessId}, {email}, {mobile}, {active}, {password: hashedPassword}]
        const suppliedEntries = convertArrayToObject(expectedEntries)

        if (adminUser) {
            const updatedAdminUser = await AdminUser.findByIdAndUpdate(req.params.id, suppliedEntries, { new: true });
            res.status(200).json({ adminUser: updatedAdminUser });
        } else {
            res.status(404).json({ error: 'AdminUser not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /adminUser/:id
export const deleteAdminUser = asyncHandler(async (req, res) => {
    try {
        const adminUser = await AdminUser.findById(req.params.id);

        if (adminUser) {
            await adminUser.deleteOne();
            res.status(200).json({ message: 'AdminUser deleted successfully' });
        } else {
            res.status(404).json({ error: 'AdminUser not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

