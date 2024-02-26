import { Router } from 'express';
import { GetApp, GetAppId, setApp, putApp, delApp } from "../../controllers/appController.js";
import { authRequired } from '../../middlewares/validateToken.js';
export const AppRoute = Router();

AppRoute
    .get('/', authRequired )
    .post('/', authRequired )
    .get('/:id', authRequired )
    .put('/:idApp', authRequired )
    .delete('/:idApp', authRequired );