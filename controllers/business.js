import expressAsyncHandler from 'express-async-handler';
import Business from '../models/Business.js'
import { convertArrayToObject } from '../utils/convertArrayToObject.js';

const asyncHandler = expressAsyncHandler;
// GET /businesses
export const getBusinesses = asyncHandler(async (req, res) => {
    try {
        const { taxId, officialName, name, description, categoryId, locationId, apiKey, logoLink, coverImageLink, photosLinks, branches, creationDate, active, address, phone, mobile, whatsapp, waze, maps, email, web, referalBy, blockedUsers, contact } = req.params
        const possibleQueries = [{ taxId }, { officialName }, { name }, { description }, { categoryId }, { locationId }, { apiKey }, { logoLink }, { coverImageLink }, { photosLinks }, { branches }, { creationDate }, { active }, { address }, { phone }, { mobile }, { whatsapp }, { waze }, { maps }, { email }, { web }, { referalBy }, { blockedUsers }, { contact }]
        const suppliedQueries = convertArrayToObject(possibleQueries)
        const businesses = await Business.find(suppliedQueries);
        res.status(200).json({ businesses });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /businesses/:id
export const getBusinessById = asyncHandler(async (req, res) => {
    try {
        const business = await Business.findById(req.params.id);
        if (business) {
            res.status(200).json({ business });
        } else {
            res.status(404).json({ error: 'Business not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /businesses
// ...

export const createBusiness = asyncHandler(async (req, res) => {
    try {

        const { taxId, officialName, name, description, categoryId, locationId, apiKey, logoLink, coverImageLink, photosLinks, branches, creationDate, active, address, phone, mobile, whatsapp, waze, maps, email, web, referalBy, blockedUsers, contact, owner } = req.body
        const possibelEntries = [{ taxId }, { officialName }, { name }, { description }, { categoryId }, { locationId }, { apiKey }, { logoLink }, { coverImageLink }, { photosLinks }, { branches }, { creationDate }, { active }, { address }, { phone }, { mobile }, { whatsapp }, { waze }, { maps }, { email }, { web }, { referalBy }, { blockedUsers }, { contact }, { owner }]
        const suppliedEntries = convertArrayToObject(possibelEntries)
        // Create a new business instance
        const business = new Business(suppliedEntries);
        business.id = `B${business._id}`

        // Save the business to the database
        const savedBusiness = await business.save();
        savedBusiness.password = undefined;

        res.status(201).json({ business: savedBusiness });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /businesses/:id
export const updateBusiness = asyncHandler(async (req, res) => {
    try {

        const { taxId, officialName, name, description, categoryId, locationId, apiKey, logoLink, coverImageLink, photosLinks, branches, creationDate, active, address, phone, mobile, whatsapp, waze, maps, email, web, referalBy, blockedUsers, contact, owner } = req.body
        const possibelEntries = [{ taxId }, { officialName }, { name }, { description }, { categoryId }, { locationId }, { apiKey }, { logoLink }, { coverImageLink }, { photosLinks }, { branches }, { creationDate }, { active }, { address }, { phone }, { mobile }, { whatsapp }, { waze }, { maps }, { email }, { web }, { referalBy }, { blockedUsers }, { contact }, { owner }]
        const suppliedEntries = convertArrayToObject(possibelEntries)

        const updatedBusiness = await Business.findByIdAndUpdate(req.params.id, suppliedEntries, { new: true });
        res.status(200).json({ business: updatedBusiness });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /businesses/:id
export const deleteBusiness = asyncHandler(async (req, res) => {
    try {
        const business = await Business.findById(req.params.id);

        if (business) {
            await business.deleteOne();
            res.status(200).json({ message: 'Business deleted successfully' });
        } else {
            res.status(404).json({ error: 'Business not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

