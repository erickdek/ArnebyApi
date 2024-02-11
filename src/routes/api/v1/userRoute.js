import { Router } from 'express';
import { login, register, logout, profile, lostpass } from "../../../controllers/authController.js";
import { authRequired } from '../../../middlewares/validateToken.js';

export const userRoute = Router();



userRoute
    /**
     * @swagger
     * tags:
     *   name: Auth
     *   description: Endpoints para autenticación de usuarios
     */

    /**
     * @swagger
     * path:
     *  /user:
     *    get:
     *      summary: Obtiene los datos del perfil de usuario
     *      tags: [User]
     *      security:
     *        - cookieAuth: []
     *      responses:
     *        200:
     *          description: Datos de usuario y eventos obtenidos exitosamente
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/JsonModel'
     */
    .get('/', authRequired, profile)

    /**
     * @swagger
     * path:
     *  /auth/login:
     *    post:
     *      summary: Iniciar sesión de usuario
     *      tags: [Auth]
     *      requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                email:
     *                  type: string
     *                password:
     *                  type: string
     *      responses:
     *        200:
     *          description: Inicio de sesión exitoso
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/JsonModel'
     */
    .post('/login', login)

    /**
     * @swagger
     * path:
     *  /auth/register:
     *    post:
     *      summary: Registrar un nuevo usuario
     *      tags: [Auth]
     *      requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                name:
     *                  type: string
     *                lastname:
     *                  type: string
     *                email:
     *                  type: string
     *                password:
     *                  type: string
     *      responses:
     *        200:
     *          description: Registro exitoso
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/JsonModel'
     */
    .post('/register', register)

    /**
     * @swagger
     * path:
     *  /auth/lost-password:
     *    post:
     *      summary: Recuperar contraseña
     *      tags: [Auth]
     *      requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                email:
     *                  type: string
     *      responses:
     *        200:
     *          description: Se ha enviado un correo electrónico para restablecer la contraseña
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/JsonModel'
     */
    .post('/lost-password', lostpass)
    .post('/logout', logout);