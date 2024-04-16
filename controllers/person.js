import expressAsyncHandler from 'express-async-handler';
import Person from '../models/Person.js'
import { convertArrayToObject } from '../utils/convertArrayToObject.js';
import { PhoneNumberSchema } from '../models/FieldClasses.js';

const asyncHandler = expressAsyncHandler;
// GET /persons
export const getPersons = asyncHandler(async (req, res) => {
    try {
        const { fName, lName, phone, mobile, businessId, type } = req.query;
        const expectedQueries = [{ fName }, { lName }, { phone }, { mobile }, { businessId }, { type }]
        const suppliedQueries = convertArrayToObject(expectedQueries) || {}
        const persons = await Person.find(suppliedQueries);
        res.status(200).json({ persons });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /persons/:id
export const getPersonById = asyncHandler(async (req, res) => {
    try {
        const person = await Person.findById(req.params.id);
        if (person) {
            res.status(200).json({ person });
        } else {
            res.status(404).json({ error: 'Person not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /persons
// ...

export const createPerson = asyncHandler(async (req, res) => {
    try {
        const { fName, lName, businessId, mobile, phone, type } = req.body;
        const expectedEntries = [{ fName }, { lName }, {mobile}, {phone}, { businessId }, { type }]

        const suppliedEntries = convertArrayToObject(expectedEntries)
        const person = new Person(suppliedEntries);
        person.id = `P${person._id}`

        const savedPerson = await person.save();

        res.status(201).json({ person: savedPerson });
    } catch (error) {
        console.log('faield', error)
        res.status(500).json({ error: error.message });
    }
});

// PUT /persons/:id
export const updatePerson = asyncHandler(async (req, res) => {
    try {

        const { fName, lName, businessId, type, mobile, phone } = req.body;
        const expectedEntries = [{ fName }, { lName }, {mobile}, {phone}, { businessId }, { type }]

        const suppliedEntries = convertArrayToObject([...expectedEntries, {mobile}, {phone}])

        const updatedPerson = await Person.findOneAndUpdate({id: req.params.id}, suppliedEntries, { new: true });
        res.status(200).json({ person: updatedPerson });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /persons/:id
export const deletePerson = asyncHandler(async (req, res) => {
    try {
        const person = await Person.findOne({ id: req.params.id});

        if (person) {
            await person.deleteOne();
            res.status(200).json({ message: 'Person deleted successfully' });
        } else {
            res.status(404).json({ error: 'Person not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

