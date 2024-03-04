import { Router } from 'express';
import fileUpload from 'express-fileupload';
import { post } from "../../controllers/fileController.js";
import { authRequired } from '../../middlewares/validateToken.js';

export const fileRoute = Router();

fileRoute
    .get('/', authRequired )

    //Subida de archivos
    .use(fileUpload({
        useTempFiles : true,
        tempFileDir : './uploads',
        limits: {
            fileSize: 15000000 //15mb
        },
        abortOnLimit: true
    }))
    .post('/upload', authRequired, post)