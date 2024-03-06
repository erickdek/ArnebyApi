import logger from '../services/logger.js';
import { checkEvent } from '../schemas/validation/eventSchema.js';
import Category from '../models/categoryModel.js';
import Event from '../models/eventModel.js';
import JsonR from '../models/jsonModel.js';
import { v4 as uuidv4 } from 'uuid';
import getLocation from '../services/getLocationInfo.js';

//Obtener eventos con parametros events y page
export const GetEvents = async (req, res) => {
    let { events, page } = req.query;

    try {
        const result = await Event.getAll({ events, page });
        return res.status(result.status).json(result);
    } catch (err) {
        logger.error(err.message);
        return res.status(500).json(new JsonR(500, false, 'event-controller-getevent', 'Server error', {}));
    }
};

//Obtener un evento por ID
export const GetEventId = async (req, res) => {
    try {
        const result = await Event.getById({ id: req.params.id });
        return res.status(result.status).json(result);
    } catch (err) {
        logger.error(err.message);
        return res.status(500).json(new JsonR(500, false, 'event-controller-geteventid', 'Server error', {}));
    }
};

//Obtener un evento por Slug
export const GetEventSlug = async (req, res) => {
    try {
        const result = await Event.getBySlug({ slug: req.params.slug });
        return res.status(result.status).json(result);
    } catch (err) {
        logger.error(err.message);
        return res.status(500).json(new JsonR(500, false, 'event-controller-geteventslug', 'Server error', {}));
    }
};

export const setEvent = async (req, res) => {
    try {
        // Validar el evento
        const validationResult = checkEvent(req.body);
        if(req.token.method != 'login'){
            return res.status(400).json(new JsonR(400, false, 'validation', 'Token no es valido', {}));
        }

        if (!validationResult.success) {
            return res.status(400).json(new JsonR(400, false, 'validation', 'Error en la validación', JSON.parse(validationResult.error.message)));
        }

        const organizer = req.token.id;

        // Normalizar el título y generar un slug
        const titleSlug = req.body.title.toLowerCase().replace(/\s+/g, '-');

        // Generar un UUID de 8 dígitos
        const uuid = uuidv4().substring(0, 8);
        const slug = `${titleSlug}-${uuid}`;

        // Comprobar si startDate es anterior a endDate
        const startDate = new Date(req.body.startDate);
        const endDate = new Date(req.body.endDate);
        if (startDate >= endDate) {
            return res.status(400).json(new JsonR(400, false, 'validation', 'La fecha de inicio debe ser anterior a la fecha de finalización', {}));
        }

        // Comprobar que la fecha de finalización sea al menos 15 minutos después de la fecha de inicio
        const fifteenMinutes = 15 * 60 * 1000; // 15 minutos en milisegundos
        if (endDate - startDate < fifteenMinutes) {
            return res.status(400).json(new JsonR(400, false, 'validation', 'La fecha de finalización debe ser al menos 15 minutos después de la fecha de inicio', {}));
        }

        // Comprobar que la fecha de inicio sea posterior a la fecha actual más 1 día
        const currentDate = new Date();
        const oneDay = 24 * 60 * 60 * 1000; // 1 día en milisegundos
        const minStartDate = new Date(currentDate.getTime() + oneDay);
        if (startDate <= minStartDate) {
            return res.status(400).json(new JsonR(400, false, 'validation', 'La fecha de inicio debe ser posterior a la fecha actual más 1 día', {}));
        }

        // Verificar si la categoría existe
        const categoryResult = await Category.getById({ id: req.body.category });
        if (!categoryResult.success) {
            return res.status(404).json(new JsonR(400, false, 'event-controller-add', 'No se encontro la categoria.', {}));
        }

        // Obtener la ubicación
        const geolocation = await getLocation({longitud: req.body.location.longitude, latitud: req.body.location.latitude})
            .catch(error => {
                return res.status(400).json(new JsonR(400, false, 'event-controller-add', 'La dirección no es válida.', {}));
            });

        // Guardar los datos de ubicación
        req.body.location.country = geolocation.country;
        req.body.location.province = geolocation.province;

        // Registrar el evento
        const newEvent = await Event.set({
            title: req.body.title,
            slug: slug,
            content: req.body.content,
            category: categoryResult.data._id,
            location: req.body.location,
            virtual: req.body.virtual,
            links: req.body.links,
            prices: req.body.prices,
            organizer: organizer,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            featuredImage: req.body.featuredImage,
            state: 'publish',
        });
        if (!newEvent.success) {
            return res.status(newEvent.status).json(new JsonR(newEvent.status, false, 'event-controller-add', newEvent.message, {}));
        }

        // Devolver respuesta exitosa
        return res.status(200).json(newEvent);
    } catch (error) {
        return res.status(500).json(new JsonR(500, false, 'event-controller-add', 'Error interno del servidor'));
    }
};

export const putEvent = async (req, res) => {
    return res.status(404).json(new JsonR(404, false, 'event-controller-putevent', 'Event not found', {}));
};

export const delEvent = async (req, res) => {
    return res.status(404).json(new JsonR(404, false, 'app-controller-delapp', 'App not found', {}));
};