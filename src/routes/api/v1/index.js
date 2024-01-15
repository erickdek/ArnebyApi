import { Router } from 'express';
import JsonR from '../../../models/jsonModel.js'
//ROUTES
import { PostRoutes } from "./postRoute.js";
import { userRoute } from "./userRoute.js";
import { AppRoute } from "./appRoute.js";
import { EventRoute } from "./eventRoute.js";
//CONTROLLERS
import { authRequired } from '../../../middlewares/validateToken.js';
import { authRequiredAdmin } from '../../../middlewares/validateAdmin.js';

const v1Routes = Router();

v1Routes
    //Acceder a informacion admin
    .use('/admin', authRequired, authRequiredAdmin)
    //Post
    .use('/post', PostRoutes )
    //App - Usuario, Asistencia, 
    .use('/app', AppRoute )
    //Autorizacion - login y register
    .use('/auth', userRoute )
    //Eventos - ver, editar, eliminar, crear, buscar
    .use('/event', EventRoute )
    .get('/', (req, res) => {res.status(200).json(new JsonR(200, true, 'app', 'Welcome to API v1', {}))})
    
export default v1Routes;