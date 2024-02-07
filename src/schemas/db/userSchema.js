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
    },
    avatar: {
        type: String,
        required: true,
        default: 'https://s3.us-central-1.wasabisys.com/src.arneby.com/web/avatar.svg',
        trim: true
    }
}, {
    timestamps: true
});

export default mongoose.model('User', userSchema);