import { Router } from 'express';
import fileUpload from 'express-fileupload'; //Upload files
import { login, register, logout, profile, lostpass, newpassword } from "../../controllers/authController.js";
import { authRequired } from '../../middlewares/validateToken.js';

export const userRoute = Router();



userRoute
    //Poder Subir archivos
    .use(fileUpload({
        useTempFiles : true,
        tempFileDir : './uploads'
    }))
    .get('/', authRequired, profile)
    .post('/login', login)
    .post('/register', register)
    .post('/lost-password', lostpass)
    .post('/new-password', newpassword)
    .post('/logout', logout);

/**
 * @swagger
 * /v1/auth:
 *   get:
 *     summary: Obtiene datos del perfil del usuario.
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Datos del perfil del usuario.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JsonModel'
 */

/**
 * @swagger
 * /v1/auth/login:
 *   post:
 *     summary: Inicia sesión de usuario.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JsonModel'
 */

/**
 * @swagger
 * /v1/auth/register:
 *   post:
 *     summary: Registra un nuevo usuario.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registro exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JsonModel'
 */

/**
 * @swagger
 * /v1/auth/lost-password:
 *   post:
 *     summary: Envía un correo electrónico para restablecer la contraseña.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Correo electrónico de restablecimiento de contraseña enviado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JsonModel'
 */

/**
 * @swagger
 * /v1/auth/logout:
 *   post:
 *     summary: Cierra sesión del usuario.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Sesión cerrada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JsonModel'
 */