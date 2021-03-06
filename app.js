const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
require('dotenv').config();

const createError = require('http-errors');
const logger = require('morgan');
const nodemailer = require('nodemailer');
const cors = require("cors");




const app = express();
app.listen(() => {
  console.log(`Server is running at port ${process.env.REACT_APP_SERVER_URL}`);
})


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});




// const cors = corsMiddleware
app.use(
  cors({
    // allow other domains/origins to send cookies
    credentials: true,
    // this is the domain we want cookies from (our React app)
    origin: ['http://localhost:3000']
  })
)


const indexRouter = require('./routes/index');
app.use('/api', indexRouter);
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
  res.json('There is a 404 error');
});

// let env = app.get('env');

module.exports = app;