import mongoose from 'mongoose'

export const packageSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    services: {
        type: [String],
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    expiredDate: {
        type: Date,
        default: Date.now
    },
    duration: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
});

export default mongoose.model('Package', packageSchema);
