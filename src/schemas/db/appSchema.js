import mongoose, { mongo } from 'mongoose';

//MONGODB
const appSchema = new mongoose.Schema({
    userid: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    appid: {
        type: String,
        required: true,
        unique: true
    },
    appkey: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    domain: { 
        type: String,
        trim: true,
    },
    apptype: String,
    resume: String,
    appban: {
        type: Boolean,
        required: true,
        default: false
    },
}, {
    timestamps: true
});

export default mongoose.model('App', appSchema);