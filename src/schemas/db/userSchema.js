import mongoose from 'mongoose';

//MONGODB
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
    }
}, {
    timestamps: true
});

export default mongoose.model('User', userSchema);