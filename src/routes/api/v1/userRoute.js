import { Router } from 'express';
import { login, register, logout, profile, lostpass } from "../../../controllers/authController.js";
import { authRequired } from '../../../middlewares/validateToken.js';

export const userRoute = Router();



userRoute
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
     * /auth:
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
     *               $ref: '#/components/schemas/User'
     */
    .get('/', authRequired, profile)

    /**
     * @swagger
     * /auth/login:
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
     *               type: object
     *               properties:
     *                 token:
     *                   type: string
     *                 id:
     *                   type: string
     *                 name:
     *                   type: string
     *                 lastname:
     *                   type: string
     *                 email:
     *                   type: string
     */
    .post('/login', login)

    /**
     * @swagger
     * /auth/register:
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
     *               $ref: '#/components/schemas/User'
     */
    .post('/register', register)

    /**
     * @swagger
     * /auth/lost-password:
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
     */
    .post('/lost-password', lostpass)

    /**
     * @swagger
     * /auth/logout:
     *   post:
     *     summary: Cierra sesión del usuario.
     *     tags: [User]
     *     responses:
     *       200:
     *         description: Sesión cerrada exitosamente.
     */
    .post('/logout', logout);

