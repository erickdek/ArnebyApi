import express from 'express';
import morgan from 'morgan';
import path from 'path';
import Routes from './src/routes/index.js';
import cookieParser from 'cookie-parser';
import exphbs from 'express-handlebars';
import cors from "cors";

const app = express();
const __dirname = path.resolve(); // Corregir la obtención de __dirname
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

//Jordy Estuvo aqui :D

// Configuración de la aplicación
app.disable('x-powered-by'); // Deshabilitar el encabezado "X-Powered-By"

app.use(cors({
    origin: [FRONTEND_URL,'http://localhost', 'https://arneby.com'],
    credentials: true, // Si se requieren credenciales (como cookies)
}));

app.use(morgan('dev')); // Usar Morgan para registrar las solicitudes HTTP
app.use(cookieParser()); // Usar Cookie Parser para trabajar con cookies

// Configuración de las vistas
app.set('views', path.join(__dirname, 'src', 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs'); // Establecer el motor de vistas
app.use(express.static(path.join(__dirname, 'src', 'public'))); //Access to Public folder

// Definición de las rutas
app.use(Routes);

export default app;
