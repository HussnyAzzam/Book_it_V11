import expressAsyncHandler from 'express-async-handler';
import Service from '../models/Services.js';
import { convertArrayToObject } from '../utils/convertArrayToObject.js';

const asyncHandler = expressAsyncHandler;
// GET /services
export const getServices = asyncHandler(async (req, res) => {
    try {
        const { name, description, active, creationDate } = req.query;

        const expectedQueries = [{ name }, { description }, { active }, { creationDate }]
        const suppliedQueries = convertArrayToObject(expectedQueries)

        const services = await Service.find(suppliedQueries);
        res.status(200).json({ services });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /services/:id
export const getServiceById = asyncHandler(async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (service) {
            res.status(200).json({ service });
        } else {
            res.status(404).json({ error: 'Service not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /services
// ...

export const createService = asyncHandler(async (req, res) => {
    try {
        const { name, description, active, creationDate } = req.body;

        const expectedEntries = [{ name }, { description }, { active }, { creationDate }]
        const suppliedEntries = convertArrayToObject(expectedEntries)
        
        const service = new Service(suppliedEntries);
        service.id = `S${service._id}`

        // Save the service to the database
        const savedService = await service.save();

        res.status(201).json({ service: savedService });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /services/:id
export const updateService = asyncHandler(async (req, res) => {
    try {

        const { name, description, active, creationDate } = req.body;

        const expectedEntries = [{ name }, { description }, { active }, { creationDate }]
        const suppliedEntries = convertArrayToObject(expectedEntries)
        const service = await Service.findById(req.params.id, );

        if (service) {
            const updatedService = await Service.findByIdAndUpdate(req.params.id, { ...suppliedEntries }, { new: true });
            res.status(200).json({ service: updatedService });
        } else {
            res.status(404).json({ error: 'Service not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /services/:id
export const deleteService = asyncHandler(async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);

        if (service) {
            await service.deleteOne();
            res.status(200).json({ message: 'Service deleted successfully' });
        } else {
            res.status(404).json({ error: 'Service not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

