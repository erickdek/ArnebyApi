import { Router } from 'express';
import { authRequired } from '../../middlewares/validateToken.js';
import { setEvent, GetEvents,  } from '../../controllers/eventController.js';

export const EventRoute = Router();

EventRoute
    //Obtener eventos
    .get('/', GetEvents)

    //Obtener un evento
    .get('/:idApp', )

    //Eliminar un evento
    .delete('/:idApp', authRequired)
    
    //Publicar un evento
    .post('/', setEvent)

    //Actualizar un evento
    .put('/:idApp', )