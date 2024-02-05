import app from "../app";
import request from 'supertest';

describe('GET /', () => {
    test('should return 200 status code', async() => {
        const response = await request(app).get('/').send();
        expect(response.statusCode).toBe(200);
    });
})

describe('GET /v1/', () => {
    test('should return 200 status code', async() => {
        const response = await request(app).get('/v1').send();
        expect(response.statusCode).toBe(200);
    });
})