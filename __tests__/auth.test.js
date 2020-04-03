const request = require('supertest-session');
const app = require('../index');

let testSession = null;

beforeEach((done) => {
	testSession = request(app);
	done()
});

describe('before authentication', () => {
	it('should redirect the user to the login page', async (done) => {
		const res = await testSession.get('/user/profile');

		expect(res.statusCode).toEqual(303);
		expect(res.header.location).toBe('/user/login');
		done();
	});

	it('doesnt allow the user to logout without being authenticated', async (done) => {
		const res = await testSession.get('/user/logout');

		expect(res.statusCode).toEqual(303);
		expect(res.headers.location).toBe('/user/login');
		done();
	});
});

describe('after authentication', () => {
	let authedRequest = null;

	beforeAll(async (done) => {
		const res = await testSession.post('/user/signup').send({
			userName: 'dean',
			email: 'dean@mail.com',
			password: 'password'
		});

		expect(res.statusCode).toEqual(302);
		authedRequest = testSession;
		done();
	});

	it('should allow the user to access the profile page', async (done) => {
		let res = await authedRequest.get('/user/profile');
		expect(res.statusCode).toEqual(200);
		done();
	});

	it('should log the user out', async (done) => {
		let res = await authedRequest.get('/user/logout');

		expect(res.statusCode).toEqual(302);
		expect(res.headers.location).toBe('/');
		done();
	});
});