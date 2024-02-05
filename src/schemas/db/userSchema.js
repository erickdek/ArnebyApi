import mongoose from 'mongoose';

//MONGODB
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    lastname: {
        type: String,
        required: false,
        trim: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
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
    credits: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    balance: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    }
}, {
    timestamps: true
});

export default mongoose.model('User', userSchema);