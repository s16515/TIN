var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const vetRoute = require('./routes/vetRoute');
const specRoute = require('./routes/specRoute');
const specVetRoute = require('./routes/specVetRoute');
const vetApiRouter = require('./routes/api/VetApiRoute');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/vets', vetRoute);
app.use('/specs', specRoute);
app.use('/api/vets', vetApiRouter);
app.use('/vets/specs-vets-add', specVetRoute);  //nie wiem jak to ugryzc, zeby nie rzucilo bledem w przyszlosci, ze nie wie ktorego usera ma pokazywac, kiedy wywolamy ta strone.
app.use('/', indexRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
