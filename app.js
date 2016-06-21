var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var pg = require('pg');
//var bcrypt = require('bcrypt');
var session = require('express-session');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('shariba', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
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
var search = require ('./routes/search')


//console.log(search)
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
app.use('/search', search);
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


var country = sequelize.define('countries', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, Infinity]
    },
  }
})

var city = sequelize.define('cities', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, Infinity]
    },
  }
})

country.hasMany(city)
city.belongsTo(country)
//city.hasMany(cityTip)

var cityTip = sequelize.define('cityTips', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, Infinity]
    },
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, Infinity]
    },
  },
  user_id: Sequelize.INTEGER
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log(req)
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


// sequelize.sync().then(function(){
//   Promise.all([
//     country.create({
//       name: 'Netherlands'
//     }).then(function(thecountry){
//       city.create({
//         name:'Amsterdam',
//         countryId: thecountry.id}
//         ),
//       city.create({
//         name:'Eindhoven',
//         countryId: thecountry.id}
//         ).then(function(thecity){
//           cityTip.create({
//             title:'Top spot',
//             body:'This place is awesome!',
//             user_id: 1
//           })
//         })
//       }),
//     country.create({
//       name:'Austria'
//     }).then(function(thecountry){
//      city.create({
//       name:'Salzburg',
//       countryId: thecountry.id
//     })
//    })
//     ])
// })

module.exports = app;