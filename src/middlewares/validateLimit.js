import rateLimit from 'express-rate-limit';
import JsonR from '../models/jsonModel.js';

// Configura el límite de solicitudes por minuto (por ejemplo, 100 solicitudes por minuto)
export default rateLimit({
  windowMs: 60 * 1000, // 15 minutes
  limit: 100, //Limit 100 requests per minute
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: async (req, res) => {
		res.status(429).json(new JsonR(429, false, 'limit-api', 'Error, many requests were made to the api.', {}));
	},
})