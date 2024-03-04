import app from "../../app";
import request from 'supertest';

describe('GET /v1/auth/', () => {
    describe('without token', () => {
        test('should return 400 status code', async() => {
            const response = await request(app).get('/v1/auth').send();
            expect(response.status).toBe(400);
        });
    })
})
describe('POST /v1/auth/', () => {
    describe('without token', () => {
        test('should return 404 status code', async() => {
            const response = await request(app).post('/v1/auth').send();
            expect(response.status).toBe(404);
        });
    })
})

describe('GET /v1/auth/login', () => {
    test('should return 404 status code', async() => {
        const response = await request(app).get('/v1/auth/login').send();
        expect(response.status).toBe(404);
    });

    test('should return 400 status code', async() => {
        const response = await request(app).post('/v1/auth/login').send();
        expect(response.status).toBe(400);
    });
})

describe('GET /v1/auth/register', () => {
    test('should return 404 status code', async() => {
        const response = await request(app).get('/v1/auth/register').send();
        expect(response.status).toBe(404);
    });

    test('should return 400 status code', async() => {
        const response = await request(app).post('/v1/auth/register').send();
        expect(response.status).toBe(400);
    });
})


describe('GET /v1/auth/lost-password', () => {
    test('should return 404 status code', async() => {
        const response = await request(app).get('/v1/auth/lost-password').send();
        expect(response.status).toBe(404);
    });
})
describe('POST /v1/auth/lost-password', () => {
    test('should return 400 status code', async() => {
        const response = await request(app).post('/v1/auth/lost-password').send();
        expect(response.status).toBe(400);
    });

    test('should return 400 status code', async() => {
        const response = await request(app).post('/v1/auth/lost-password').send();
        expect(response.status).toBe(400);
    });
})



describe('GET /v1/auth/new-password', () => {
    test('should return 404 status code', async() => {
        const response = await request(app).get('/v1/auth/new-password').send();
        expect(response.status).toBe(404);
    });
})
describe('POST /v1/auth/new-password', () => {
    test('should return 400 status code', async() => {
        const response = await request(app).post('/v1/auth/new-password').send();
        expect(response.status).toBe(400);
    });

    test('should return 400 status code', async() => {
        const response = await request(app).post('/v1/auth/new-password').send();
        expect(response.status).toBe(400);
    });
})