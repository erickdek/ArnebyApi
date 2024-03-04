import mongoose from 'mongoose';

//MONGODB
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true }, // Nombre de la categoría
    slug: { type: String, required: true },
    description: { type: String },
}, {
    timestamps: true
});

export default mongoose.model('Category', categorySchema);