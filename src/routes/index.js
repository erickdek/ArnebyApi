import { Router, json } from 'express';
const router = Router();

import apiRoute from './api/index.js'

router.use('/', apiRoute);

export default router;