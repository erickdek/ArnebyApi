import { Router, json } from 'express';
import JsonR from '../models/jsonModel.js';
import v1Route from './v1/index.js';
import apiLimit from '../middlewares/validateLimit.js';

//Express Router
const router = Router();

router
    //limit Api
    .use(apiLimit)

    //Wellcome
    .get('/', (req, res) => {res.status(200).json(new JsonR(200, true, 'app', 'Welcome to Arneby API', {}))})
    
    //Endpoints for Version 1
    .use('/v1', v1Route)

export default router;