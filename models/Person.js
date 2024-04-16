import mongoose from 'mongoose'
import { PhoneNumberSchema } from './FieldClasses.js';

const personSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    fName: {
        type: String,
        required: true,
    },
    lName: {
        type: String,
        required: true,
    },
    phone: {
        type: PhoneNumberSchema,
        required: false
    },
    mobile: {
        type: PhoneNumberSchema,
        required: true
    },
    businessId: {
        type: [Number],
        required: true
    },
    type: {
        type: String,
        enum: ['Contact', 'Owner', 'Both'],
        required: true
    }
});

const Person = mongoose.model('Person', personSchema);

export default Person;
