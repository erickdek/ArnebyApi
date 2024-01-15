import { Router } from 'express';
import { login, register, logout, profile } from "../../../controllers/authController.js";
import { authRequired } from '../../../middlewares/validateToken.js';

export const userRoute = Router();

userRoute
    .get('/', authRequired, profile)
    .post('/login', login)
    .post('/register', register)
    .post('/logout', logout);