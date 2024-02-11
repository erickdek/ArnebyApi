import SwaggerJSDoc from 'swagger-jsdoc';
import SwaggerUI from 'swagger-ui-express';
import url from 'url';
import path from 'path';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

//Info about the Api
const apiOptions = {
    definition: {
        openapi: "3.0.0",
        info: {title: "Arneby API", version: "1.0.0"}
    },
    apis: [path.join(__dirname, "../v1/*.js")]
}

//DOCS en json format
const swaggerSpec = SwaggerJSDoc(apiOptions);

//Function to setup our docs
export const swaggerDocs = (app, port) => {
    app.use('/v1/docs', SwaggerUI.serve, SwaggerUI.setup(swaggerSpec));
    app.get('/v1/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    console.log(`Doc api/v1/docs is available at http://localhost:${port}/v1/docs`);
}