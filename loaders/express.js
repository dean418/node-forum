const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const path = require('path');
const {nanoid} = require('nanoid');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const express = require('express');

const index = require('../routes/index');

exports.expressLoader = (app, mongooose) => {
	app.use(express.static(path.join(__dirname + 'public')));
	app.use(bodyParser.urlencoded({extended: false}));
	app.use(bodyParser.json());

	app.engine('.hbs', hbs({
		defaultLayout: 'layout',
		extname: '.hbs'
	}));
	app.set('view engine', '.hbs');

	app.use(session({
		secret: process.env.SESSION_SECRET,
		saveUninitialized: false,
		resave: false,
		store: new MongoStore({mongooseConnection: mongooose.connection}),
		genid: () => {
			return nanoid();
		}
	}));

	app.use('/', index);
}