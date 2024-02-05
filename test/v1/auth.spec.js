import app from "../../app";
import request from 'supertest';

describe('GET /v1/auth/', () => {
    describe('without token', () => {
        test('should return 400 status code', async() => {
            const response = await request(app).get('/v1/auth').send();
            expect(response.statusCode).toBe(400);
        });
    })
})

describe('GET /v1/auth/login', () => {
    test('should return 404 status code', async() => {
        const response = await request(app).get('/v1/auth/login').send();
        expect(response.statusCode).toBe(404);
    });

    test('should return 400 status code', async() => {
        const response = await request(app).post('/v1/auth/login').send();
        expect(response.statusCode).toBe(400);
    });
})

describe('GET /v1/auth/register', () => {
    test('should return 404 status code', async() => {
        const response = await request(app).get('/v1/auth/register').send();
        expect(response.statusCode).toBe(404);
    });

    test('should return 400 status code', async() => {
        const response = await request(app).post('/v1/auth/register').send();
        expect(response.statusCode).toBe(400);
    });
})