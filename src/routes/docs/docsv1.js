import SwaggerJSDoc from 'swagger-jsdoc';
import SwaggerUI from 'swagger-ui-express';
import url from 'url';
import path from 'path';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

//Info about the Api
const apiDocsV1 = {
    definition: {
        openapi: "3.0.3",
        info: {title: "Arneby API v1", version: "1.0.0"}
    },
    apis: [path.join(__dirname, "../v1/*.js")]
}

const specsV1 = SwaggerJSDoc(apiDocsV1);

//Function to setup our docs
export const swaggerDocs = (app, port) => {
    app.use('/v1/documentation', SwaggerUI.serve, SwaggerUI.setup(specsV1));
    app.get('/v1/documentation.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(specsV1);
    });

    console.log(`Doc api/v1/documentation is available at http://localhost:${port}/v1/documentation`);
}