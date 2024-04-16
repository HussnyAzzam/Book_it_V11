import mongoose from 'mongoose'
import { AddressSchema, PersonSchema, PhoneNumberSchema } from './FieldClasses.js';

const businessSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    taxId: {
        type: String,
        required: false,
    },
    officialName: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    categoryId: {
        type: String,
        required: true,
    },
    locationId: {
        type: String,
        required: true,
    },
    apiKey: {
        type: String,
        required: true,
    },
    logoLink: {
        type: String,
        required: true
    },
    coverImageLink: {
        type: String,
        required: true
    },
    photosLinks: {
        type: [String],
        required: true
    },
    branches: {
        type: [String],
        required: true,
    },
    countBranches: {
        type: Number,
        required: true,
        default: 0
    },
    creationDate: {
        type: Date,
        default: Date.now()
    },
    active: {
        type: Boolean,
        required: true,
    },
    address: {
        type: AddressSchema,
        required: true
    },
    phone: {
        type: PhoneNumberSchema,
        required: true
    },
    mobile: {
        type: PhoneNumberSchema,
        required: true
    },
    whatsapp: {
        type: String,
        required: true
    },
    waze: {
        type: String,
        required: true
    },
    maps: {
        type: String,
        required: false
    },
    email: {
        type: String,
        require: false
    },
    web: {
        type: String,
        required: false
    },
    referalBy: {
        type: String,
        required: false
    },
    owner: {
        type: PersonSchema,
        required: true  
    },
    contact: {
        type: PersonSchema,
        required: true  
    },
    blockedUsers: {
        type: [String],
        required: true
    },

});

const Business = mongoose.model('Business', businessSchema);

export default Business;
