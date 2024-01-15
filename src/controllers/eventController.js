import { checkAppGen } from '../schemas/validation/appSchema.js';
import App from '../models/appModel.js'
import JsonR from '../models/jsonModel.js'

export const GetEvent = async (req, res) => {
    
    return res.status(404).json(new JsonR(404, false, 'app-controller-getapp', 'App not found', {}));
};

export const GetEventId = async (req, res) => {
    return res.status(404).json(new JsonR(404, false, 'app-controller-getappid', 'App not found', {}));
};

export const setEvent = async (req, res) => {
    const result = await checkAppGen(req.body);
    if(!result.success){
        return res.status(400).json(new JsonR(400, false, 'app-controller-add', 'Error consulta', JSON.parse(result.error.message)))
    }
    try {
        const newApp = await App.set({
            userid: req.user.id,
            name: req.body.name,
            domain: req.body.domain,
            apptype: req.body.apptype,
            resume: req.body.resume
        })
        if(!newApp.success){
            return res.status(400).json(new JsonR(400, false, 'app-controller-add', newApp.message, {}));
        }
        return res.status(200).json(newApp);
    } catch (e) {
        return res.status(500).json(new JsonR(400, false, 'app-controller-add', 'Server error', {}));
    }
};

export const putEvent = async (req, res) => {
    
    return res.status(404).json(new JsonR(404, false, 'app-controller-putapp', 'App not found', {}));
};

export const delEvent = async (req, res) => {
    return res.status(404).json(new JsonR(404, false, 'app-controller-delapp', 'App not found', {}));
};