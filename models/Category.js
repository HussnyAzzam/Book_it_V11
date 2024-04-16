import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: false
    },
    creationDate: {
        type: Date
    }
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
