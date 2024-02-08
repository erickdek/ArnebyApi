import logger from '../services/logger.js';
import { checkEvent } from '../schemas/validation/eventSchema.js';
import Event from '../models/eventModel.js';
import JsonR from '../models/jsonModel.js';

export const GetEvents = async (req, res) => {
    const { eventsPerPage, page } = req.query;

    try {
        const result = await AppModel.getAll({ eventsPerPage, page });
        return res.status(result.statusCode).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json(new JsonR(500, false, 'event-controller-getevent', 'Server error', {}));
    }
};

export const GetEventId = async (req, res) => {
    return res.status(404).json(new JsonR(404, false, 'event-controller-geteventid', 'Event not found', {}));
};

export const setEvent = async (req, res) => {
    const result = await checkEvent(req.body);
    if(!result.success){
        return res.status(400).json(new JsonR(400, false, 'event-controller-add', 'Error consulta', JSON.parse(result.error.message)))
    }
    try {
        const newEvent = await Event.set({
            userid: req.user.id,
            name: req.body.name,
            domain: req.body.domain,
            apptype: req.body.apptype,
            resume: req.body.resume
        })
        if(!newEvent.success){
            return res.status(newEvent.statusCode).json(new JsonR(newEvent.statusCode, false, 'event-controller-add', newEvent.message, {}));
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