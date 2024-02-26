import { Router } from 'express';
import JsonR from '../../models/jsonModel.js'
//ROUTES
import { userRoute } from "./userRoute.js";
import { AppRoute } from "./appRoute.js";
import { EventRoute } from "./eventRoute.js";
//CONTROLLERS
import { authRequired } from '../../middlewares/validateToken.js';
import { authRequiredAdmin } from '../../middlewares/validateAdmin.js';

const v1Routes = Router();

// Acceder a informacion admin
v1Routes
    //Welcome
    .get('/', (req, res) => {
        res.status(200).json(new JsonR(200, true, 'app', 'Welcome to API v1', {}));
    })
    // App - Usuario, Asistencia
    .use('/app', AppRoute)

    // Autorizacion - login y register
    .use('/auth', userRoute)

    // Eventos - ver, editar, eliminar, crear, buscar
    .use('/event', EventRoute);


//Componentes de SWAGGER para documentar

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         lastname:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 *         avatar:
 *           type: string
 *         created_at:
 *           type: string
 *         updated_at:
 *           type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginData:
 *       type: object
 *       properties:
 *         user:
 *           type: object
 *           properties:
 *              id:
 *                  type: string
 *              name:
 *                  type: string
 *              lastname:
 *                  type: string
 *              email:
 *                  type: string
 *              role:
 *                  type: string
 *              avatar:
 *                  type: string
 *         token:
*            type: apikey
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     JsonModel:
 *       type: object
 *       properties:
 *         status:
 *           type: number
 *           description: El código de estado HTTP de la respuesta.
 *         success:
 *           type: boolean
 *           description: Indica si la operación fue exitosa.
 *         code:
 *           type: string
 *           description: Un código personalizado para la respuesta.
 *         msg:
 *           type: string
 *           description: Un mensaje descriptivo de la respuesta.
 *         data:
 *           oneOf:
 *             - $ref: '#/components/schemas/User'  # Para la respuesta de perfil de usuario
 *             - $ref: '#/components/schemas/LoginData'  # Para la respuesta de inicio de sesión
 *             - type: object  # Para otras respuestas que no necesitan datos específicos
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: token
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     tokenAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 *       description: Token de autenticación JWT
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     queryAuth:
 *       type: apiKey
 *       in: query
 *       name: token
 *       description: Token de autenticación JWT
 */
    
export default v1Routes;