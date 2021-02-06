var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session');


var indexRouter = require('./routes/index');
const vetRoute = require('./routes/vetRoute');
const specRoute = require('./routes/specRoute');
const specVetRoute = require('./routes/specVetRoute');
const vetApiRouter = require('./routes/api/VetApiRoute');
const specApiRouter = require('./routes/api/SpecApiRoute');
const specVetApiRouter = require('./routes/api/SpecVetApiRoute');

var app = express();
app.use(session({
  secret: 'my_secret_password',
  resave: false
}));

//Dane w sesji nie są bezpośrednio dostępne w szablonach strony, zatem napiszemy funkcję, która je udostępni. 
//W tym celu należy zmodyfikować app.js, rejestrując poniższą funkcję po podłączeniu mechanizmu sesji (ale przed naszymi routerami).
//res.locals jest zbiorem wszystkich parametrów przekazanych do szablonu. 
//Mechanizm szablonów EJS wyrzuci błąd, jeśli użyjemy jakiegoś parametru, który nie został uprzednio przekazany. 
//Ponizsza funkcja zabezpiecza nas przed tym błędem. Oprócz danych sesji, musimy też zabezpieczyć parametr w którym przekazany jest błąd logowania.

app.use((req, res, next) => {
  const loggedUser = req.session.loggedUser;
  res.locals.loggedUser = loggedUser;
  if(!res.locals.loginError) {
      res.locals.loginError = undefined;
  }
  next();
});

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
app.use('/specVets', specVetRoute);  


app.use('/api/vets', vetApiRouter);
app.use('/api/specs', specApiRouter);
app.use('/api/specVets', specVetApiRouter);

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
