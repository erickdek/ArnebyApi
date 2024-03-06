import { Router } from 'express';
import { authRequired } from '../../middlewares/validateToken.js';
import { setEvent, GetEvents, GetEventId, GetEventSlug } from '../../controllers/eventController.js';
import { getAllCategory, getCategoryById, postCategory, getCategoryBySlug } from '../../controllers/categoryController.js';
import { authRequiredAdmin } from '../../middlewares/validateAdmin.js';

export const EventRoute = Router();

EventRoute
    //Categorias
    .get('/category', getAllCategory)
    .get('/category/:id', getCategoryById)
    .get('/category_slug/:slug', getCategoryBySlug)
    .get('/category_name/:name', getCategoryById)
    .post('/category', authRequired, authRequiredAdmin, postCategory)

    //Eventos
    .get('/', GetEvents)
    .get('/:id', GetEventId)
    .get('/slug/:slug', GetEventSlug)
    .post('/', authRequired, setEvent)
    .delete('/:idApp', authRequired)
    .put('/:idApp', )