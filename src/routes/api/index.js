import { Router, json } from 'express';
import JsonR from '../../models/jsonModel.js'
//ROUTES
import v1Route from './v1/index.js';

const apiRoutes = Router();

apiRoutes.use(json());
apiRoutes
    .get('/', (req, res) => {res.status(200).json(new JsonR(200, true, 'app', 'Welcome to Arneby API', {}))})
    .use('/v1', v1Route)

    
    //404
    .use((req, res) => {res.status(404).json(new JsonR(404, false, 'app', 'Endpoint not found', {}))});

export default apiRoutes;