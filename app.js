import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import Routes from './src/routes/index.js';
import cookieParser from 'cookie-parser';
import cors from "cors";

const app = express();
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// Configuración de la aplicación
app.disable('x-powered-by'); // Deshabilitar el encabezado "X-Powered-By"
app.set('trust proxy', true);

app.use(bodyParser.json());
app.use(express.json());

app.use(cors({
    origin: ['http://localhost:4321', FRONTEND_URL, 'https://arneby.com'],
    credentials: true, // Si se requieren credenciales (como cookies)
}));

app.use(morgan('dev')); // Usar Morgan para registrar las solicitudes HTTP
app.use(cookieParser()); // Usar Cookie Parser para trabajar con cookies

// Definición de las rutas
app.use(Routes);

export default app;
