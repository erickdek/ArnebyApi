import mongoose from 'mongoose';

//MONGODB
const mediaSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    extension: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    urls: {
        type: [{
            name: String,
            url: String
        }],
        required: true
    },
    isPublic: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export default mongoose.model('Media', mediaSchema);