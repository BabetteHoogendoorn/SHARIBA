var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../modules/database');
var pg = require('pg');
var Sequelize = require('sequelize');

// Set the view engine
router.set( 'views', 'views' )
router.set( 'view engine', 'pug' )


/* GET city page. */
router.get('/city', function(req, res) {
  Promise.all([
    country.findAll({
      include: [
        {model: db.country},
        {model: deb.city,
        include: {model: db.cityTip,
          include: {model: db.user}
        }]
    })then.(function(list) {
      response.render('city', {
        country: list
      })
    })
  })
})


module.exports = router;
