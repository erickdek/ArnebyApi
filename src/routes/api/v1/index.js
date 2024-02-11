import { Router } from 'express';
import JsonR from '../../../models/jsonModel.js'
//ROUTES
import { userRoute } from "./userRoute.js";
import { AppRoute } from "./appRoute.js";
import { EventRoute } from "./eventRoute.js";
//CONTROLLERS
import { authRequired } from '../../../middlewares/validateToken.js';
import { authRequiredAdmin } from '../../../middlewares/validateAdmin.js';

const v1Routes = Router();

// Acceder a informacion admin
v1Routes.use('/admin', authRequired, authRequiredAdmin);

// App - Usuario, Asistencia
v1Routes.use('/app', AppRoute);

// Autorizacion - login y register
v1Routes.use('/auth', userRoute);

// Eventos - ver, editar, eliminar, crear, buscar
v1Routes.use('/event', EventRoute);

v1Routes.get('/', (req, res) => {
    res.status(200).json(new JsonR(200, true, 'app', 'Welcome to API v1', {}));
});

/**
 * @swagger
 * components:
 *  schemas:
 *    JsonModel:
 *      type: object
 *      properties:
 *        status:
 *          type: number
 *        success:
 *          type: boolean
 *        code:
 *          type: string
 *        msg:
 *          type: string
 *        data:
 *          type: object
 *          description: Datos adicionales de la respuesta
 */
    
export default v1Routes;