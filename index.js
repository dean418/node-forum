const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const path = require('path');
const { nanoid } = require('nanoid');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const express = require('express');

const app = express();

require('dotenv').config();

const SessionModel = require('./models/sessionModel');

const index = require('./routes/index');
const user = require('./routes/user');
const post = require('./routes/post');

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}, async (err) => {
	if (err) {
		console.log(err);
	}
	//#### DEV ####\\
	const UserModel = require('./models/userModel');
	const PostModel = require('./models/postModel');

	await Promise.all([
		SessionModel.deleteMany({}),
		UserModel.deleteMany({}),
		PostModel.deleteMany({})
	]);
	//### END DEV ###\\
});

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload({
	useTempFiles: false,
	preserveExtension: true
}));

app.engine('.hbs', hbs({
	defaultLayout: 'layout',
	extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.use(session({
	secret: process.env.SESSION_SECRET,
	saveUninitialized: false,
	resave: false,
	store: new MongoStore({ mongooseConnection: mongoose.connection }),
	genid: () => {
		return nanoid();
	},
	cookie: {
		maxAge: 1000 * 60 * 60 * 2,
	}
}));

app.use(async (req, res, next) => {
	res.locals.loggedIn = await SessionModel.hasSession(req.sessionID);
	return next();
})

app.use('/', index);
app.use('/user', user);
app.use('/post', post)

module.exports = app;