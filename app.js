const express = require('express');
const methodOverride = require('method-override');
const restful = require('node-restful');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = restful.mongoose;
const path = require('path');
const cookieParser = require('cookie-parser');
const models = require('./schemas');
const helmet = require('./');
const app = express();


//setup routes
const index = require('./routes/index');
const users = require('./routes/users');
const setuppage = require('./routes/setup');


//setup views engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('env', 'development');

app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(cookieParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/setup', setuppage);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

mongoose.connect('mongodb://localhost/m');

const Resource = app.resource = restful.model('Project', mongoose.Schema({
    name: String,
    index: String
})).methods(['get', 'post', 'put', 'delete']);

Resource.register(app, '/re');

module.exports = app;
