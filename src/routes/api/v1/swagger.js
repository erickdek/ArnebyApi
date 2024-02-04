import SwaggerJSDoc from 'swagger-jsdoc';
import SwaggerUI from 'swagger-ui-express';

//Info about the Api
const apiOptions = {
    definition: {
        openapi: "3.0.1",
        info: {title: "Arneby API", version: "1.0.0"}
    },
    apis: ['src/routes/api/v1/index.js']
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