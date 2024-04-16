import expressAsyncHandler from 'express-async-handler';
import Package from '../models/Package.js'
import { convertArrayToObject } from '../utils/convertArrayToObject.js';

const asyncHandler = expressAsyncHandler;
// GET /packages
export const getPackages = asyncHandler(async (req, res) => {
    try {
        const { name, services, active, creationDate, expiredDate, duration, price } = req.query;
        const expectedQueries = [{ name }, { services }, { active }, { creationDate }, { expiredDate }, { duration }, { price }]
        const suppliedQueries = convertArrayToObject(expectedQueries)

        const packages = await Package.find(suppliedQueries);
        res.status(200).json({ packages });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /packages/:id
export const getPackageById = asyncHandler(async (req, res) => {
    try {

        const packageVariable = await Package.findById(req.params.id);
        if (packageVariable) {
            res.status(200).json({ packageVariable });
        } else {
            res.status(404).json({ error: 'Package not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /packages
// ...

export const createPackage = asyncHandler(async (req, res) => {
    try {
        const { name, services, active, creationDate, expiredDate, duration, price } = req.body;

        const expectedEntries = [{ name }, { services }, { active }, {creationDate}, { expiredDate }, { duration }, { price }]
        const suppliedEntries = convertArrayToObject(expectedEntries)
        // Create a new packageVariable instance
        const packageVariable = new Package(suppliedEntries);
        packageVariable.id = `G${packageVariable._id}`

        // Save the packageVariable to the database
        const savedPackage = await packageVariable.save();
        savedPackage.password = undefined;

        res.status(201).json({ package: savedPackage });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /packages/:id
export const updatePackage = asyncHandler(async (req, res) => {
    try {
        const { name, services, active, creationDate, expiredDate, duration, price } = req.body;
        const packageVariable = await Package.findById(req.params.id);

        const expectedEntries = [{ name }, { services }, { active }, {creationDate}, { expiredDate }, { duration }, { price }]
        const suppliedEntries = convertArrayToObject(expectedEntries)

        if (packageVariable) {
            const updatedPackage = await Package.findByIdAndUpdate(req.params.id, { ...suppliedEntries }, { new: true });
            res.status(200).json({ package: updatedPackage });
        } else {
            res.status(404).json({ error: 'Package not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /packages/:id
export const deletePackage = asyncHandler(async (req, res) => {
    try {
        const packageVariable = await Package.findById(req.params.id);

        if (packageVariable) {
            await packageVariable.deleteOne();
            res.status(200).json({ message: 'Package deleted successfully' });
        } else {
            res.status(404).json({ error: 'Package not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

