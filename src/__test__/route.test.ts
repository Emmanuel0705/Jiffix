import app from '../app';
import supertest from 'supertest';

describe('GET / - a simple api endpoint', () => {
    it('Hello API Request', async () => {
        const result = await supertest(app).get('/');
        console.log(result.status, result.statusType, result.text);
        expect(result.text).toEqual('hello');
        expect(result.status).toEqual(200);
    });
});
