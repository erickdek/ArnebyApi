import { Router } from 'express';
import { authRequired } from '../../../middlewares/validateToken.js';
import { setEvent, GetEvents,  } from '../../../controllers/eventController.js';
export const EventRoute = Router();

EventRoute
    .get('/', GetEvents)
    .post('/', setEvent)
    .get('/:idApp', )
    .put('/:idApp', )
    .delete('/:idApp', authRequired);