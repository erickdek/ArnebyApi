import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: false,
        trim: true
    },
    email: { 
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: { 
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    avatar: {
        type: String,
        required: true,
        default: '/web/avatar.svg',
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    country: {
        type: String,
        default: '',
        trim: true
    },
    favoriteEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    preferences: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

export default mongoose.model('User', userSchema);
