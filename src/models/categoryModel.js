import CategoryDB from '../schemas/db/categorySchema.js';
import JsonR from '../models/jsonModel.js'

class CategoryModel{
    /**
     * Crea una nueva categoría.
     * @param {string} name - El nombre de la categoría.
     * @param {string} description - La descripción de la categoría.
     * @returns {object} - El resultado de la operación.
     */
    static async post({ name, description }) {
        try {
            // Convertir el nombre en un slug
            const slug = name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '_');

            const Category = new CategoryDB({
                name: name,
                slug: slug,
                description: description,
            });
            const result = await Category.save();

            // Devolvemos los datos
            return new JsonR(200, true, 'category-model-post', 'Se publicó la categoría', result);
        } catch (error) {
            console.error('Error:', error);
            throw error; // Lanzar el error para que sea manejado por el código que llama a esta función
        }
    }

    /**
     * Actualiza una categoría.
     * @param {string} name - El nuevo nombre de la categoría.
     * @param {string} slug - El nuevo slug de la categoría.
     * @param {string} description - La nueva descripción de la categoría.
     * @returns {object} - El resultado de la operación.
     */
    static async update({ name, slug, description }) {
        try {
            // Verificar si existe una categoría con el slug proporcionado
            const existingCategory = await CategoryDB.findOne({ slug: slug });
            if (!existingCategory) {
                return new JsonR(404, false, 'category-model-update', 'Categoría no encontrada', {});
            }

            // Actualizar los campos de la categoría
            existingCategory.name = name;
            existingCategory.description = description;

            // Guardar los cambios en la base de datos
            const result = await existingCategory.save();

            // Devolver el resultado de la actualización
            return new JsonR(200, true, 'category-model-update', 'Categoría actualizada con éxito', result);
        } catch (error) {
            console.error('Error:', error);
            throw error; // Lanzar el error para que sea manejado por el código que llama a esta función
        }
    }

    /**
     * Obtiene todas las categorías.
     * @returns {object} - El resultado de la operación.
     */
    static async get() {
        try {
            const result = await CategoryDB.find();
            // Devolvemos los datos
            return new JsonR(200, true, 'category-model-get', 'Se obtuvieron las categorías', result);
        } catch (error) {
            console.error('Error:', error);
            throw error; // Lanzar el error para que sea manejado por el código que llama a esta función
        }
    }

    /**
     * Obtiene una categoría por su slug.
     * @param {string} slug - El slug de la categoría.
     * @returns {object} - El resultado de la operación.
     */
    static async getBySlug({slug}) {
        try {
            const result = await CategoryDB.findOne({ slug: slug });

            // Devolvemos los datos
            if (result) {
                return new JsonR(200, true, 'category-model-getbyslug', 'Se obtuvo la categoría por slug', result);
            } else {
                return new JsonR(404, false, 'category-model-getbyslug', 'No se encontró la categoría con el slug proporcionado', null);
            }
        } catch (error) {
            console.error('Error:', error);
            throw error; // Lanzar el error para que sea manejado por el código que llama a esta función
        }
    }

    /**
     * Obtiene una categoría por su nombre.
     * @param {string} name - El nombre de la categoría.
     * @returns {object} - El resultado de la operación.
     */
    static async getByName({ name }) {
        try {
            const result = await CategoryDB.find({ name: name });

            // Devolvemos los datos
            return new JsonR(200, true, 'category-model-get-by-name', 'Se obtuvieron las categorías por nombre', result);
        } catch (error) {
            console.error('Error:', error);
            throw error; // Lanzar el error para que sea manejado por el código que llama a esta función
        }
    }

    /**
     * Obtiene una categoría por su ID.
     * @param {string} id - El ID de la categoría.
     * @returns {object} - El resultado de la operación.
     */
    static async getById({ id }) {
        try {
            const result = await CategoryDB.findById(id);

            // Devolvemos los datos
            return new JsonR(200, true, 'category-model-get-by-id', 'Se obtuvo la categoría por ID', result);
        } catch (error) {
            console.error('Error:', error);
            throw error; // Lanzar el error para que sea manejado por el código que llama a esta función
        }
    }

    /**
     * Elimina una categoría por su ID.
     * @param {string} id - El ID de la categoría.
     * @returns {object} - El resultado de la operación.
     */
    static async delete({ id }) {
        try {
            const result = await CategoryDB.findByIdAndDelete(id);

            // Devolvemos los datos
            return new JsonR(200, true, 'category-model-delete', 'Se eliminó la categoría', result);
        } catch (error) {
            console.error('Error:', error);
            throw error; // Lanzar el error para que sea manejado por el código que llama a esta función
        }
    }

}

export default CategoryModel;