import expressAsyncHandler from 'express-async-handler';
import BusinessBranch from '../models/BusinessBranch.js'
import { convertArrayToObject } from '../utils/convertArrayToObject.js';

const asyncHandler = expressAsyncHandler;
// GET /businessBranch
export const getBusinessBranches = asyncHandler(async (req, res) => {
    try {
        const { name, businessId, groupCalendarLink, active, creationDate, coverImageLink, photosLinks, packageDetails, packageStartDate, leftDays, packageExpiredDate, address, phone, mobile, whatsapp, waze, maps, email, web, contact, type } = req.params
        const possibleQueries = [{ name }, { businessId }, { groupCalendarLink }, { active }, { creationDate }, { coverImageLink }, { photosLinks }, { package: packageDetails }, { packageStartDate }, { leftDays }, { packageExpiredDate }, { address }, { phone }, { mobile }, { whatsapp }, { waze }, { maps }, { email }, { web }, { contact }, { type }]
        const suppliedQueries = convertArrayToObject(possibleQueries) || {}
        const businessBranches = await BusinessBranch.find(suppliedQueries);
        res.status(200).json({ businessBranches });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /business-branch/:id
export const getBusinessBranchById = asyncHandler(async (req, res) => {
    try {
        const businessBranch = await BusinessBranch.findById(req.params.id);
        if (businessBranch) {
            res.status(200).json({ businessBranch });
        } else {
            res.status(404).json({ error: 'BusinessBranch not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /business-branch
// ...

export const createBusinessBranch = asyncHandler(async (req, res) => {
    try {
        const { name, businessId, groupCalendarLink, active, creationDate, coverImageLink, photosLinks, packageDetails, packageStartDate, leftDays, packageExpiredDate, address, phone, mobile, whatsapp, waze, maps, email, web, contact, type } = req.body
        
        const possibelEntries = [{ name }, { businessId }, { groupCalendarLink }, { active }, { creationDate }, { coverImageLink }, { photosLinks }, { package: packageDetails }, { packageStartDate }, { leftDays }, { packageExpiredDate }, { address }, { phone }, { mobile }, { whatsapp }, { waze }, { maps }, { email }, { web }, { contact }, { type }]

        const suppliedEntries = convertArrayToObject(possibelEntries)

        const businessBranch = new BusinessBranch(suppliedEntries);
        businessBranch.id = `R${businessBranch._id}`

        // Save the businessBranch to the database
        const savedBusinessBranch = await businessBranch.save();

        res.status(201).json({ businessBranch: savedBusinessBranch });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /businessBranch/:id
export const updateBusinessBranch = asyncHandler(async (req, res) => {
    try {
        const { name, businessId, groupCalendarLink, active, creationDate, coverImageLink, photosLinks, packageDetails, packageStartDate, leftDays, packageExpiredDate, address, phone, mobile, whatsapp, waze, maps, email, web, contact, type } = req.body
        const possibelEntries = [{ name }, { businessId }, { groupCalendarLink }, { active }, { creationDate }, { coverImageLink }, { photosLinks }, { package: packageDetails }, { packageStartDate }, { leftDays }, { packageExpiredDate }, { address }, { phone }, { mobile }, { whatsapp }, { waze }, { maps }, { email }, { web }, { contact }, { type }]
        const suppliedEntries = convertArrayToObject(possibelEntries)

        const updatedBusinessBranch = await BusinessBranch.findByIdAndUpdate(req.params.id, suppliedEntries, { new: true });
        res.status(200).json({ businessBranch: updatedBusinessBranch });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /businessBranch/:id
export const deleteBusinessBranch = asyncHandler(async (req, res) => {
    try {
        const businessBranch = await BusinessBranch.findById(req.params.id);

        if (businessBranch) {
            await businessBranch.deleteOne();
            res.status(200).json({ message: 'BusinessBranch deleted successfully' });
        } else {
            res.status(404).json({ error: 'BusinessBranch not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

