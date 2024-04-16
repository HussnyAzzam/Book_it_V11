import expressAsyncHandler from 'express-async-handler';
import ExternalCustomer from '../models/ExternalCustomers.js'
import { convertArrayToObject } from '../utils/convertArrayToObject.js';

const asyncHandler = expressAsyncHandler;
// GET /externalCustomers
export const getExternalCustomers = asyncHandler(async (req, res) => {
    const { fName, lName, phone, mobile, creationDate, email, country, business_id, city } = req.query;
    const expectedQueries = [{ fName }, { lName }, { phone }, { mobile }, { creationDate }, { email }, { country }, { business_id }, {city}]
    const suppliedQueries = convertArrayToObject(expectedQueries) || {}
    try {
        const externalCustomers = await ExternalCustomer.find(suppliedQueries);
        res.status(200).json({ externalCustomers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /externalCustomers/:id
export const getExternalCustomerById = asyncHandler(async (req, res) => {
    try {
        const externalCustomer = await ExternalCustomer.findById(req.params.id);
        if (externalCustomer) {
            res.status(200).json({ externalCustomer });
        } else {
            res.status(404).json({ error: 'ExternalCustomer not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /externalCustomers
// ...

export const createExternalCustomer = asyncHandler(async (req, res) => {
    try {
        const { fName, lName, creationDate, email, mobile,  country, business_id, city } = req.body;
        const expectedEntries = [{ fName }, { lName }, { creationDate }, { email }, {mobile}, { country }, { business_id }, {city}]
        const suppliedEntries = convertArrayToObject(expectedEntries) || {}
        // Create a new externalCustomer instance
        const externalCustomer = new ExternalCustomer(suppliedEntries);
        externalCustomer.id = `E${externalCustomer._id}`

        // Save the externalCustomer to the database
        const savedExternalCustomer = await externalCustomer.save();

        res.status(201).json({ externalCustomer: savedExternalCustomer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /externalCustomers/:id
export const updateExternalCustomer = asyncHandler(async (req, res) => {
    try {

        const { fName, lName, creationDate, email, mobile, country, business_id } = req.body;
        const expectedEntries = [{ fName }, { lName }, { creationDate }, { email }, {mobile}, { country }, { business_id }]
        const suppliedEntries = convertArrayToObject(expectedEntries) || {}

        const updatedExternalCustomer = await ExternalCustomer.findByIdAndUpdate(req.params.id, suppliedEntries, { new: true });
        
        res.status(200).json({ externalCustomer: updatedExternalCustomer });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /externalCustomers/:id
export const deleteExternalCustomer = asyncHandler(async (req, res) => {
    try {
        const externalCustomer = await ExternalCustomer.findById(req.params.id);

        if (externalCustomer) {
            await externalCustomer.deleteOne();
            res.status(200).json({ message: 'ExternalCustomer deleted successfully' });
        } else {
            res.status(404).json({ error: 'ExternalCustomer not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

