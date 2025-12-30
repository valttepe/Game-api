import request from 'supertest';
import app from '../app';
import { getMockPlayerId, getRandomEventId } from './helper/gameEventMocks';
import { mockQuery } from './helper/gameEventMocks';

describe('Healt check', () => {
    it('should return API health status', async () => {
        const res = await request(app).get('/');

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ message: 'API is running 🚀' });
    });
});

describe('Purchase game', () => {
    it('should return current balance', async () => {
        const playerId = getMockPlayerId();
        const eventId = getRandomEventId();
        console.log('testing');
        const res = await request(app)
            .put('/api/game-events')
            .send({
                eventId: eventId,
                playerId: playerId,
                amount: '100',
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');

        expect(res.status).toBe(200);
        console.log('Body', res.body);
    });
});