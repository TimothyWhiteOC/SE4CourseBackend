var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cors = require("cors");
require("./config/db.config");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

const cor = cors({
  origin: function(origin, callback) {
    callback(null, true);
  },
  credentials: true
});
app.use(cor);
app.options("*", cor);

var mysql = require("mysql");
//Database connection
app.use(function(req, res, next) {
  res.locals.connection = mysql.createConnection(dbconfig);
  res.locals.connection.connect();
  next();
});

var port = '8081';
var hostname = 'localhost';
app.listen(port, hostname, function () {
  console.log("The server is running at http://".concat(hostname, ":").concat(port));
});

module.exports = app;
