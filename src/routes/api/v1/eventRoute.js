import { Router } from 'express';
import fileUpload from 'express-fileupload'; //Upload files
import { authRequired } from '../../../middlewares/validateToken.js';
import { setEvent, GetEvents,  } from '../../../controllers/eventController.js';

export const EventRoute = Router();

EventRoute
    .use(fileUpload())
    .get('/', GetEvents)
    .post('/', setEvent)
    .get('/:idApp', )
    .put('/:idApp', )
    .delete('/:idApp', authRequired);