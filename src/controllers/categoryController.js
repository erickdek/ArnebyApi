import logger from '../services/logger.js';
import { checkCategory, checkNameCategory, checkSlugCategory, checkDescriptionCategory, checkIdCategory } from '../schemas/validation/categorySchema.js';
import Category from '../models/categoryModel.js';
import JsonR from '../models/jsonModel.js';

//Obtener eventos con parametros events y page
export const getAllCategory = async (req, res) => {
    try {
        const result = await Category.get();
        console.log(result);
        return res.status(result.status).json(result);

    } catch (err) {
        console.error(err);
        logger.error(err.message);
        return res.status(500).json(new JsonR(500, false, 'category-controller-getallcategory', 'Error interno del servidor', {}));
    }
};

// Método para publicar una categoría
export const postCategory = async (req, res) => {
    try {
        const check = checkCategory(req.body);
        if(!check.success){
            return res.status(400).json(new JsonR(400, false, 'category-controller-validation', 'Error en la consulta', JSON.parse(check.error.message)))
        }
        const { name } = req.body; // Extrae los campos name y description del cuerpo de la solicitud
        // Aquí puedes agregar la lógica para convertir el nombre en slug según lo requerido
        const descripcion = req.bodydescription ? req.bodydescription : '';

        const result = await Category.post({ name, descripcion });
        return res.status(result.status).json(result);

    } catch (err) {
        logger.error(err.message);
        return res.status(500).json(new JsonR(500, false, 'category-controller-postCategory', 'Error interno del servidor', {}));
    }
};

// Método para obtener una categoría por su slug
export const getCategoryBySlug = async (req, res) => {
    try {
        const check = checkSlugCategory(req.params);
        if(!check.success){
            return res.status(400).json(new JsonR(400, false, 'category-controller-validation', 'Error en la consulta', JSON.parse(check.error.message)))
        }

        const slug = req.params.slug; // Obtiene el slug de los parámetros de la solicitud
        const result = await Category.getBySlug({ slug: slug }); // Busca la categoría por su slug en la base de datos
        return res.status(result.status).json(result);
    } catch (err) {
        logger.error(err.message);
        return res.status(500).json(new JsonR(500, false, 'category-controller-getCategoryBySlug', 'Error interno del servidor', {}));
    }
};

// Método para obtener una categoría por su ID
export const getCategoryById = async (req, res) => {
    try {
        const check = checkIdCategory(req.params);
        if(!check.success){
            return res.status(400).json(new JsonR(400, false, 'category-controller-validation', 'Error en la consulta', JSON.parse(check.error.message)))
        }

        const id = req.params.id; // Obtiene el ID de los parámetros de la solicitud
        const result = await Category.getById({ id }); // Busca la categoría por su ID en la base de datos
        return res.status(result.status).json(result);
    } catch (err) {
        logger.error(err.message);
        return res.status(500).json(new JsonR(500, false, 'category-controller-getCategoryById', 'Error interno del servidor', {}));
    }
};

// Método para obtener una categoría por su nombre
export const getCategoryByName = async (req, res) => {
    try {
        const check = checkNameCategory(req.params);
        if(!check.success){
            return res.status(400).json(new JsonR(400, false, 'category-controller-validation', 'Error en la consulta', JSON.parse(check.error.message)))
        }

        const name = req.params.name; // Obtiene el nombre de los parámetros de la solicitud
        const result = await Category.getByName({ name: name }); // Busca la categoría por su nombre en la base de datos
        return res.status(result.status).json(result);
    } catch (err) {
        logger.error(err.message);
        return res.status(500).json(new JsonR(500, false, 'category-controller-getCategoryByName', 'Error interno del servidor', {}));
    }
};

// Método para eliminar una categoría por su ID
export const deleteCategoryById = async (req, res) => {
    try {
        const check = checkIdCategory(req.params);
        if(!check.success){
            return res.status(400).json(new JsonR(400, false, 'category-controller-validation', 'Error en la consulta', JSON.parse(check.error.message)))
        }

        const id = req.params.id; // Obtiene el ID de los parámetros de la solicitud
        const result = await Category.delete({ id }); // Elimina la categoría por su ID en la base de datos
        return res.status(result.status).json(result);
    } catch (err) {
        logger.error(err.message);
        return res.status(500).json(new JsonR(500, false, 'category-controller-deleteCategoryById', 'Error interno del servidor', {}));
    }
};