import mongoose from 'mongoose'
import { packageSchema } from './Package.js';
import { PhoneNumberSchema, AddressSchema } from './FieldClasses.js';

const businessBranchSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    businessId: {
        type: String,
        required: true
    },
    groupCalendarLink: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now()
    },
    coverImageLink: {
        type: String,
        required: true
    },
    photosLinks: {
        type: [String],
        required: true
    },
    package: {
        type: packageSchema,
        required: true
    },
    packageStartDate: {
        type: Date,
        required: true
    },
    leftDays: {
        type: Number,
        required: true
    },
    packageExpiredDate: {
        type: Date,
        required: true
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
        type: PhoneNumberSchema,
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
        require: false
    },
    type: {
        type: String,
        enum: ['NB', 'SDB'],
        required: true,
    }
});

const BusinessBranch = mongoose.model('BusinessBranch', businessBranchSchema);

export default BusinessBranch;
