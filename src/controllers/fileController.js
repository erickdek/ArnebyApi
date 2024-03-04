import logger from '../services/logger.js';
import Media from '../models/fileModel.js'
import JsonR from '../models/jsonModel.js'

export const get = async (req, res) => {
    return res.status(404).json(new JsonR(404, false, 'app-controller-getapp', 'App not found', {}));
};

export const getById = async (req, res) => {
    return res.status(404).json(new JsonR(404, false, 'app-controller-getappid', 'App not found', {}));
};

export const getByKey = async (req, res) => {
    return res.status(404).json(new JsonR(404, false, 'app-controller-getappid', 'App not found', {}));
};

export const post = async (req, res) => {
    try {
        const postMedia = await Media.post({file: req.files.file, user: req.token});
        if (!postMedia.success){
            return res.status(postMedia.status).json(postMedia);
        }

        return res.status(postMedia.status).json(postMedia);
    } catch (e) {
        console.log(e);
        return res.status(500).json(new JsonR(400, false, 'file-controller-post', 'Server error', {}));
    }
};

export const update = async (req, res) => {
    return res.status(404).json(new JsonR(404, false, 'app-controller-getappid', 'App not found', {}));
};

export const del = async (req, res) => {
    return res.status(404).json(new JsonR(404, false, 'app-controller-getappid', 'App not found', {}));
};