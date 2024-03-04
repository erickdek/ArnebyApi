import logger from '../services/logger.js';
import { checkEvent } from '../schemas/validation/eventSchema.js';
import Category from '../models/categoryModel.js';
import Event from '../models/eventModel.js';
import JsonR from '../models/jsonModel.js';
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
    return res.status(404).json(new JsonR(404, false, 'event-controller-geteventid', 'Event not found', {}));
};

export const setEvent = async (req, res) => {
    try {
        console.log(req.body);
        // Validar el evento
        const validationResult = checkEvent(req.body);
        if (!validationResult.success) {
            return res.status(400).json(new JsonR(400, false, 'validation', 'Error en la validación', JSON.parse(validationResult.error.message)));
        }

        // Verificar si la categoría existe
        try {
            const categoryResult = await Category.getById({ id: req.body.category });
            if (!categoryResult.success) {
                return res.status(404).json(new JsonR(404, false, 'event-controller-add', 'La categoría no fue encontrada.'));
            }
        } catch (error) {
            console.error('Error al obtener la categoría:', error);
            return res.status(500).json(new JsonR(500, false, 'event-controller-add', 'Error interno del servidor'));
        }

        // Obtener la ubicación
        const geolocation = await getLocation(req.body.location.longitude, req.body.location.latitude)
            .catch(error => {
                return res.status(400).json(new JsonR(400, false, 'event-controller-add', 'La dirección no es válida.'));
            });

        // Guardar los datos de ubicación
        req.body.location.country = geolocation.country;
        req.body.location.province = geolocation.province;

        // Registrar el evento
        const newEvent = await Event.set(req.body);
        if (!newEvent.success) {
            return res.status(newEvent.status).json(new JsonR(newEvent.status, false, 'event-controller-add', newEvent.message));
        }

        // Devolver respuesta exitosa
        return res.status(200).json(newEvent);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json(new JsonR(500, false, 'event-controller-add', 'Error interno del servidor'));
    }
};

export const putEvent = async (req, res) => {
    return res.status(404).json(new JsonR(404, false, 'event-controller-putevent', 'Event not found', {}));
};

export const delEvent = async (req, res) => {
    return res.status(404).json(new JsonR(404, false, 'app-controller-delapp', 'App not found', {}));
};