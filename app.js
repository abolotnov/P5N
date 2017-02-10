var express = require('express'),
    methodOverride = require('method-override'),
    restful = require('node-restful'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    mongoose = restful.mongoose,
    path = require('path'),
    cookieParser = require('cookie-parser'),
    models = require('./schemas');
var app = express();

//setup routes
var index = require('./routes/index');
var users = require('./routes/users');
var setuppage = require('./routes/setup');


//setup views engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('env', 'development');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(cookieParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/setup', setuppage);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

mongoose.connect('mongodb://localhost/m');

var Resource = app.resource = restful.model('Project', mongoose.Schema({name: String, index: String})).methods(['get', 'post', 'put', 'delete']);
Resource.register(app, '/re');

module.exports = app;
