const request = require('supertest-session');
const app = require('../index');

describe('GET login/signup pages', () => {
	it('should return the signup page', async (done) => {
		const res = await request(app).get('/user/signup');
		expect(res.statusCode).toEqual(200);
		done();
	});

	it('should return the login page', async (done) => {
		const res = await request(app).get('/user/login');
		expect(res.statusCode).toEqual(200);
		done();
	});
});

describe('POST signup/login pages', () => {
	it('should create a user and take them to the index page', async (done) => {
		const res = await request(app).post('/user/signup').send({
			userName: 'dean',
			email: 'dean@mail.com',
			password: 'password'
		});

		expect(res.statusCode).toEqual(302);
		expect(res.header.location).toBe('/');
		done();
	});

	it('should log a user in and redirect them to the index page', async (done) => {
		const res = await request(app).post('/user/login').send({
			login: 'dean',
			password: 'password'
		});

		expect(res.statusCode).toEqual(302);
		expect(res.header.location).toBe('/');
		done();
	});

	it('incorrect credentials, render login page', async (done) => {
		const res = await request(app).post('/user/login').send({
			login: 'notauser',
			password: 'password'
		});

		expect(res.statusCode).toEqual(200);
		expect('/A user wasn\'t found with that username or email/')
		done();
	});

	it('incorrect password, render login page', async (done) => {
		const res = await request(app).post('/user/login').send({
			login: 'dean',
			password: 'notthepassword'
		});

		expect(res.statusCode).toEqual(200);
		expect('/The entered password is incorrect/')
		done();
	});
});