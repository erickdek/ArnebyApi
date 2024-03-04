import mongoose from 'mongoose';

//MONGODB
const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    location: {
        longitude: { type: Number, required: true },
        latitude: { type: Number, required: true },
        country: { type: String, required: true },
        province: { type: String, required: true },
        address: { type: String, required: true },
    },
    virtual: { type: Boolean, default: false },
    links: [
        {
            title: { type: String, required: true },
            url: { type: String, required: true },
        },
    ],
    prices: [
        {
            plan: { type: String, required: true },
            benefits: [{ type: String }],
            price: { type: Number, required: true },
        },
    ],
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    registeredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    startDate: { type: Number, required: true },
    endDate: { type: Number, required: true },
    featuredImage: { type: mongoose.Schema.Types.ObjectId, ref: 'Media' },
}, {
    timestamps: true
})

export default mongoose.model('Event', eventSchema);