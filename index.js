import dbConnect from './db.js';'./src/database/mongodb-connect.js';
import app from './app.js';
import { app404 as endPoint404 } from './src/routes/404.js';
import { swaggerDocs as v1Swagger } from "./src/routes/docs/docsv1.js";
import logger from './src/services/logger.js';

const PORT = process.env.PORT ?? 3000;

dbConnect();
app.listen(PORT, (req, res) => {
    logger.info(`Server listening on port ${PORT}`);
    v1Swagger(app, PORT);

    //Error 404 ninguna ruta concuerda
    endPoint404(app, PORT);
});