import { Router } from 'express';
import { login, register, logout, profile, lostpass } from "../../../controllers/authController.js";
import { authRequired } from '../../../middlewares/validateToken.js';

export const userRoute = Router();

userRoute
    //Get data from user profile
    /**
     * @swagger
     * components:
     *  schemas:
     *   User:
     * 
     */
    .get('/', authRequired, profile)
    .post('/login', login)
    .post('/register', register)
    .post('/lost-password', lostpass)
    .post('/logout', logout);