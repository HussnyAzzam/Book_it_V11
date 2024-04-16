
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs';

import { PhoneNumberSchema } from './FieldClasses.js';

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: false
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
        type: Date,
        default: Date.now
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
    password: {
        type: String,
        required: true
    },
    activated: {
        type: Boolean,
        required: true,
        default: false
    },
    blockedByBusiness: {
        type: [String],
        required: false
    }
});

userSchema.pre('save', async function (next ) {
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
