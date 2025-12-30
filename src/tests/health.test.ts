import request from 'supertest';
import app from '../app';

describe('User API', () => {
    it('should return API health status', async () => {
        const res = await request(app).get('/');

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ message: 'API is running 🚀' });
    });
});
