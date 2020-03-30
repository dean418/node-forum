const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const express = require('express');

const app = express();

require('dotenv').config();

mongoose.connect(`mongodb+srv://dean:${DB_PASS}@cluster0-aeu8n.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const index = require('./routes/index');

app.use(express.static(path.join(__dirname + 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.use('/', index);

app.listen(3000, () => {
    console.log('listening on port 3000');
});