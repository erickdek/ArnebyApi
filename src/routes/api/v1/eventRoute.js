import { Router } from 'express';
import { authRequired } from '../../../middlewares/validateToken.js';
export const EventRoute = Router();

EventRoute
    .get('/', )
    .post('/', )
    .get('/:idApp', )
    .put('/:idApp', )
    .delete('/:idApp', authRequired);