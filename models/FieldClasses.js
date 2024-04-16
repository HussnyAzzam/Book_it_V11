import mongoose from 'mongoose'

export const PhoneNumberSchema = new mongoose.Schema({
    countryCode: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    }
});

export const PersonSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    phone: {
        type: PhoneNumberSchema,
        required: false
    },
    mobile: {
        type: PhoneNumberSchema,
        required: true
    },
});


export const AddressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: false
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
    postalCode: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    }
});