import { Router, json } from 'express';
const router = Router();

import apiRoute from './api/index.js'
import JsonR from '../models/jsonModel.js';

router.use('/', apiRoute);

//404
router.use((req, res) => {res.status(404).render('404')});

export default router;