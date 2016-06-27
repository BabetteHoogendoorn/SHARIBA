var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
//var bcrypt = require('bcrypt');
var db = require('../modules/database');
var pg = require('pg');
var Sequelize = require('sequelize');
var session = require('express-session');

router.get('/', function(req, res) {
  res.render('favorites', {title: 'Tipster Favs'})
});

module.exports = router;
