import mongoose from 'mongoose'

const appointmentSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    apiId: {
        type: String,
        required: true,
        unique: true
    },
    branchId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['confirmed', 'cancelled', 'deleted', 'showed', 'noshow', 'invalid'],
        required: true
    },
    notes: {
        type: String,
        required: false
    }
});

export default mongoose.model('Appointment', appointmentSchema);
