import { Router } from 'express';
import fileUpload from 'express-fileupload'; //Upload files
import { authRequired } from '../../../middlewares/validateToken.js';
import { setEvent, GetEvents,  } from '../../../controllers/eventController.js';

export const EventRoute = Router();

EventRoute
    //Obtener eventos
    .get('/', GetEvents)

    //Obtener un evento
    .get('/:idApp', )

    //Eliminar un evento
    .delete('/:idApp', authRequired)

    //Poder Subir archivos
    .use(fileUpload({
        useTempFiles : true,
        tempFileDir : './uploads'
    }))

    //Publicar un evento
    .post('/', setEvent)

    //Actualizar un evento
    .put('/:idApp', )