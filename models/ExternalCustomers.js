import mongoose from 'mongoose'
import { PhoneNumberSchema } from './FieldClasses.js';

const externalCustomerSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    mobile: {
        type: PhoneNumberSchema,
        required: true
    },
    creationDate: {
        type: String,
        required: true,
        default: Date.now()
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true,
        default: "ISR"
    },
    business_id: {
        type: String,
        required: true,
        unique: true
    },
});

const ExternalCustomer = mongoose.model('ExternalCustomer', externalCustomerSchema);

export default ExternalCustomer;
