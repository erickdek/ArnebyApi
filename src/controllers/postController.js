import { checkPostGen } from '../schemas/validation/postSchema.js';
import JsonR from '../models/jsonModel.js'

export const getPost = async (req, res) => {
    const result = checkPostGen(req.query)
    if(!result.success){
        return res.status(400).json(new JsonR(400, false, 'post-cont-getPost', 'Error en la consulta', JSON.parse(result.error.message)))
    }
    res.status(404).json(new JsonR(404, false, 'post-cont-getPost', 'Post not found', {}));
};

export const getPostAppid = async (req, res) => {

    res.status(404).json(new JsonR(404, false, 'post-cont-getPost', 'Post not found', {}));
};

export const getPostId = async (req, res) => {
    res.status(404).json(new JsonR(404, false, 'post-cont-getPostId', 'Post not found', {}));
};

export const setPost = async (req, res) => {
    const result = checkPostGen(req.body)
    if(!result.success){
        return res.status(400).json(new JsonR(400, false, 'post-cont-setPost', 'Error en la consulta', JSON.parse(result.error.message)))
    }

    res.status(400).json(new JsonR(400, false, 'post-cont-setPost', 'Post Created error', {}));
};

export const putPost = async (req, res) => {
    const result = checkPostGen(req.body)
    if(!result.success){
        return res.status(400).json({message: JSON.parse(result.error.message)})
    }

    res.status(400).json({message: 'Post Error: Created error'});
};

export const delPost = async (req, res) => {
    const result = checkPostGen(req.body)
    if(!result.success){
        return res.status(400).json({message: JSON.parse(result.error.message)})
    }

    res.status(400).json({message: 'Post Error: Created error'});
};