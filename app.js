var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var pg = require('pg');
var session = require('express-session');
var app = express();

// Session config
app.use(session({
  secret: 'oh wow very secret much security',
  resave: true,
  saveUninitialized: false,
  cookie: {
    expires: false
  }
}));
app.use(function(req,res,next){
  console.log('main triggered ' + Date.now())
  next()
})

// Get all routes
var routes = require('./routes/index');
var users = require('./routes/users');
var profile = require('./routes/profile');
var city = require('./routes/city');
var search = require ('./routes/search')
var login = require ('./routes/login');
var register = require ('./routes/register');
var logout = require ('./routes/logout');


// Get database config
var db = require('./modules/database')

// var theuser = req.session.user

// view engine setup
app.set('views', './views');
app.set('view engine', 'jade');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', routes);
app.use('/login', login);
app.use('/profile', profile);
app.use('/register', register);
app.use('/users', users);
app.use('/search', search);
app.use('/logout', logout);


// Static files
app.use(express.static('./public'));
app.use('/search', express.static('./public'));


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


app.listen(3000)