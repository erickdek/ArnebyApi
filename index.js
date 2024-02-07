import dbConnect from './db.js';'./src/database/mongodb-connect.js';
import app from './app.js';
import cors from "cors";
import { app404 as endPoint404 } from './src/routes/404.js';
import { swaggerDocs as v1Swagger } from "./src/routes/api/v1/swagger.js";
import logger from './logger.js';

const PORT = process.env.PORT ?? 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(cors({
  origin: [FRONTEND_URL,'http://localhost', 'https://arneby.com'],
  credentials: true, // Si se requieren credenciales (como cookies)
}));

dbConnect();
app.listen(PORT, (req, res) => {
    logger.info(`Server listening on port ${PORT}`);
    v1Swagger(app, PORT);

    //Error 404 ninguna ruta concuerda
    endPoint404(app, PORT);
});