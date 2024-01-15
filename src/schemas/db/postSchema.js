import mongoose from 'mongoose';

//MONGODB
const postSchema = new mongoose.Schema({
    userid: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    appid: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'App',
        required: true
    },
    keyword: {
        type: String,
        required: true,
        trim: true
    },
    upgrade_keyword: String,
    idea_keywords: [String],
    title_post: String,
    country: {
        type: String,
        required: true
    },
    google_search: Object,
    help_content: String,
    content: String,
    resume: String,
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    completed_percent: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 100
    }
}, {
    timestamps: true
});

export default mongoose.model('post', postSchema);