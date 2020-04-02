const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const path = require('path');
const {nanoid} = require('nanoid');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const express = require('express');

const app = express();

require('dotenv').config();

const SessionModel = require('./models/session');

const index = require('./routes/index');
const user = require('./routes/user');

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

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
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    genid: () => {
        return nanoid();
    },
    cookie: {
        maxAge: 1000 * 60 * 60 * 2,
    }
}));

app.use(async (req, res, next) => {
    console.log(req.session);

    res.locals.loggedIn = await SessionModel.hasSession(req.sessionID);
    return next();
})

app.use('/', index);
app.use('/user', user);``

app.listen(process.env.PORT, (err) => {
    console.log(`server listening on port: ${process.env.PORT}`);
});
