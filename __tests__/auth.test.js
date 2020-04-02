const request = require('supertest-session');
const app = require('../index');

describe('before authentication', () => {
    it('should redirect the user to the login page', async (done) => {
        const res = await request(app).get('/user/profile');

        expect(res.statusCode).toEqual(303);
        expect(res.header.location).toBe('/user/login');
        done();
    });
});

describe('after authentication', () => {
    let authedRequest = null;

    beforeEach(async (done) => {
        const res = await request(app).post('/user/login').send({
            userName: 'dean',
            password: 'password'
        });
        expect(res.statusCode);
    });
});