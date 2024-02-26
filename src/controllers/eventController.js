import logger from '../services/logger.js';
import { S3 } from '../services/s3.js';
import { checkEvent } from '../schemas/validation/eventSchema.js';
import Event from '../models/eventModel.js';
import JsonR from '../models/jsonModel.js';

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

//Publicar un evento
export const setEvent = async (req, res) => {
    console.log(req.files);
    await S3.upload(req.files.file);

    const result = await checkEvent(req.body);
    //if(!result.success){
     //   return res.status(400).json(new JsonR(400, false, 'validation', 'Error consulta', JSON.parse(result.error.message)))
    //}
    try {
        const newEvent = await Event.set({
            userid: req.user.id,
            name: req.body.name,
            domain: req.body.domain,
            apptype: req.body.apptype,
            resume: req.body.resume
        })
        if(!newEvent.success){
            return res.status(newEvent.status).json(new JsonR(newEvent.status, false, 'event-controller-add', newEvent.message, {}));
        }
        return res.status(200).json(newEvent);
    } catch (e) {
        return res.status(500).json(new JsonR(400, false, 'event-controller-add', 'Server error', {}));
    }
};

export const putEvent = async (req, res) => {
    return res.status(404).json(new JsonR(404, false, 'event-controller-putevent', 'Event not found', {}));
};

export const delEvent = async (req, res) => {
    return res.status(404).json(new JsonR(404, false, 'app-controller-delapp', 'App not found', {}));
};