import mongoose from 'mongoose';

//MONGODB
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true }, // Nombre de la categoría
    slug: { type: String, required: true },
    description: { type: String },
}, {
    timestamps: true
});

// Middleware para antes de guardar un nuevo documento
categorySchema.pre('save', async function(next) {
    const category = this;

    // Verificar si el slug ya existe
    const existingCategory = await mongoose.model('Category').findOne({ slug: category.slug });

    if (existingCategory) {
        // Si ya existe, agregar sufijo -2, -3, -4, etc.
        let suffix = 2;
        while (await mongoose.model('Category').findOne({ slug: `${category.slug}-${suffix}` })) {
            suffix++;
        }
        category.slug = `${category.slug}-${suffix}`;
    }

    next();
});

export default mongoose.model('Category', categorySchema);