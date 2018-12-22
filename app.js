const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
require('dotenv').config();

const createError = require('http-errors');
const logger = require('morgan');
const nodemailer = require('nodemailer');
const cors = require("cors");
// const restify = require('restify')
// const corsMiddleware = require('restify-cors-middleware');




const app = express();
app.listen(3010);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
app.use('/', indexRouter);
app.use('/users', usersRouter);

// const cors = corsMiddleware
app.use(cors({
  // allow other domains/origins to send cookies
  credentials: true,
  // this is the domain we want cookies from (our React app)
  origin: ["http://localhost:3001"]
})
);

const formRouter = require('./routes/form-router');
app.use('/api', formRouter);

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
  res.json('error');
});


module.exports = app;
