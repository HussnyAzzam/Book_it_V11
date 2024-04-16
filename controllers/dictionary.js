import expressAsyncHandler from 'express-async-handler';
import Dictionary from '../models/Dictionary.js'
import { convertArrayToObject } from '../utils/convertArrayToObject.js';

const asyncHandler = expressAsyncHandler;
// GET /dictionaries
export const getDictionaries = asyncHandler(async (req, res) => {
    try {
        const { word, hebrew, arabic } = req.query
        const possibleQueries = [{ word }, { hebrew }, { arabic }]
        const suppliedQueries = convertArrayToObject(possibleQueries) || {}
        const dictionaries = await Dictionary.find(suppliedQueries);
        res.status(200).json({ dictionaries });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /dictionaries/:id
export const getDictionaryById = asyncHandler(async (req, res) => {
    try {
        const dictionary = await Dictionary.findById(req.params.id);
        if (dictionary) {
            res.status(200).json({ dictionary });
        } else {
            res.status(404).json({ error: 'Dictionary not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /dictionaries
// ...

export const createDictionary = asyncHandler(async (req, res) => {
    try {
        const { word, hebrew, arabic } = req.body
        const expectedEntries = [{ word }, { hebrew }, { arabic }]
        const suppliedEntries = convertArrayToObject(expectedEntries)
        // Create a new dictionary instance
        const dictionary = new Dictionary(suppliedEntries);
        dictionary.id = `W${dictionary._id}`

        // Save the dictionary to the database
        const savedDictionary = await dictionary.save();
        savedDictionary.password = undefined;

        res.status(201).json({ dictionary: savedDictionary });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /dictionaries/:id
export const updateDictionary = asyncHandler(async (req, res) => {
    try {
        const { word, hebrew, arabic } = req.body
        const expectedEntries = [{ word }, { hebrew }, { arabic }]
        const suppliedEntries = convertArrayToObject(expectedEntries)

        const updatedDictionary = await Dictionary.findByIdAndUpdate(req.params.id, suppliedEntries, { new: true });
        res.status(200).json({ dictionary: updatedDictionary });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /dictionaries/:id
export const deleteDictionary = asyncHandler(async (req, res) => {
    try {
        const dictionary = await Dictionary.findById(req.params.id);

        if (dictionary) {
            await dictionary.deleteOne();
            res.status(200).json({ message: 'Dictionary deleted successfully' });
        } else {
            res.status(404).json({ error: 'Dictionary not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

