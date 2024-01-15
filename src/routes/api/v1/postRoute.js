import { Router } from 'express';
import { getPost, setPost, getPostId, putPost, delPost } from "../../../controllers/postController.js";
import { authRequired } from '../../../middlewares/validateToken.js';
export const PostRoutes = Router();

PostRoutes
    .get('/', authRequired, getPost)
    .post('/', authRequired, setPost)
    .get('/:idPost', authRequired, getPostId)
    .put('/:idPost', authRequired, putPost)
    .delete('/:idPost', authRequired, delPost);