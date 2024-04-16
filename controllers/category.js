import expressAsyncHandler from 'express-async-handler';
import Category from '../models/Category.js';
import { convertArrayToObject } from '../utils/convertArrayToObject.js';

const asyncHandler = expressAsyncHandler;
// GET /categories
export const getCategories = asyncHandler(async (req, res) => {
    try {
        const { name, count, creationDate } = req.query
        const possibleQueries = [{ name }, { count }, { creationDate }]
        const suppliedQueries = convertArrayToObject(possibleQueries) || {}
        const categories = await Category.find(suppliedQueries);
        res.status(200).json({ categories });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /categories/:id
export const getCategoryById = asyncHandler(async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (category) {
            res.status(200).json({ category });
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /categories
// ...

export const createCategory = asyncHandler(async (req, res) => {
    try {
        const { name, count, creationDate } = req.body
        const possibleEntries = [{ name }, { count }, { creationDate }]
        const suppliedEntries = convertArrayToObject(possibleEntries)
        // Create a new category instance
        const category = new Category(suppliedEntries);
        category.id = `C${category._id}`

        // Save the category to the database
        const savedCategory = await category.save();

        res.status(201).json({ category: savedCategory });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /categories/:id
export const updateCategory = asyncHandler(async (req, res) => {
    try {
        const { name, count, creationDate } = req.body
        const possibleEntries = [{name}, {count}, {creationDate}]
        const suppliedEntries = convertArrayToObject(possibleEntries)

        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, suppliedEntries, { new: true });
        res.status(200).json({ category: updatedCategory });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /categories/:id
export const deleteCategory = asyncHandler(async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (category) {
            await category.deleteOne();
            res.status(200).json({ message: 'Category deleted successfully' });
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

