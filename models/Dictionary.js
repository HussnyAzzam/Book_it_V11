import mongoose from 'mongoose'

const dictionarySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    word: {
        type: String,
        required: true
    },
    arabic: {
        type: String,
        required: true
    },
    hebrew: {
        type: String,
        required: true
    }
});

const Dictionary = mongoose.model('Dictionary', dictionarySchema);

export default Dictionary;
