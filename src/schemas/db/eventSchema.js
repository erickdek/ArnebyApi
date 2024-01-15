import mongoose from 'mongoose';

//MONGODB
const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
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
    coorganizers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    registeredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    photos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Media' }],
    featuredImage: { type: mongoose.Schema.Types.ObjectId, ref: 'Media' },
}, {
    timestamps: true
});

export default mongoose.model('Event', eventSchema);