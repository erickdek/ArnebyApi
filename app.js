import express from 'express';
import morgan from 'morgan';
import path from 'path';
import Routes from './src/routes/index.js';
import cookieParser from 'cookie-parser';
import cors from "cors";

const app = express();
const __dirname = path.resolve(); // Corregir la obtención de __dirname
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// Configuración de la aplicación
app.disable('x-powered-by'); // Deshabilitar el encabezado "X-Powered-By"

app.use(cors({
    origin: ['http://localhost:4321', FRONTEND_URL, 'https://arneby.com'],
    credentials: true, // Si se requieren credenciales (como cookies)
}));

app.use(morgan('dev')); // Usar Morgan para registrar las solicitudes HTTP
app.use(cookieParser()); // Usar Cookie Parser para trabajar con cookies

app.use(express.static(path.join(__dirname, 'src', 'public'))); //Access to Public folder

// Definición de las rutas
app.use(Routes);

export default app;
