var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var pg = require('pg');
var bcrypt = require('bcrypt');
var session = require('express-session');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('SHARIBA', process.env.POSTGRES_USER, null, {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    timestamps: false
  }
});


var routes = require('./routes/index');
var users = require('./routes/users');
var profile = require('./routes/profile');
var city = require('./routes/city');
var log_in = require ('./routes/login');

var app = express();
//var app = module.exports = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static ('../public'));

app.use('/', routes);
app.use('/users', users);
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'oh wow very secret much security',
  resave: true,
  saveUninitialized: false
}));



var user = sequelize.define('users', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 50]
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 55]
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, Infinity]
    },
  }
}, {
  freezeTableName: true,
  instanceMethods: {
    generateHash: function(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    },
    validPassword: function(password) {
      return bcrypt.compareSync(password, this.password);
    },
  }
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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


module.exports = app;
