// instantiate standard libraries
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


//setup router for each set of routes
// importing from the routes/
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const blogsRouter = require('./routes/blogs');

//instantiate the actual express app
// const port = 3001
const app = express();

// view engine setup
// sets application settings (things we can access across the application)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//associating the libraries with the app
// adding middleware
//(adding libraries that we can use throughout the application)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//we bind(associate) the routers to routes in our application
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/blogs', blogsRouter);

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
