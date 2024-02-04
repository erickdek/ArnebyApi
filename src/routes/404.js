import JsonR from '../models/jsonModel.js';

//EndPoint for 404 error
export const app404 = (app, port) => {
    app.use((req, res) => {res.status(404).json(new JsonR(404, false, 'app', 'Endpoint not found', {}))});
}