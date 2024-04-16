import mongoose from 'mongoose'
import bcrypt from 'bcryptjs';
import { PersonSchema, PhoneNumberSchema } from './FieldClasses.js';

const adminUserSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    businessId: {
        type: [String],
        required: true,
    },
    contact: {
        type: PersonSchema,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    mobile: {
        type: PhoneNumberSchema,
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
    active: {
        type: Boolean,
        required: true
    },
    creationDate: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

adminUserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const AdminUser = mongoose.model('AdminUser', adminUserSchema);

export default AdminUser;
