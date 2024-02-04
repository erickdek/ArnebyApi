import { Router } from 'express';
import { GetApp, GetAppId, setApp, putApp, delApp } from "../../../controllers/appController.js";
import { authRequired } from '../../../middlewares/validateToken.js';
export const AppRoute = Router();

AppRoute
    .get('/', authRequired, GetApp)
    .post('/', authRequired, setApp)
    .get('/:id', authRequired, GetAppId)
    .put('/:idApp', authRequired, putApp)
    .delete('/:idApp', authRequired, delApp);