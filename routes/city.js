var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../modules/database');
var pg = require('pg');
var Sequelize = require('sequelize');

// Set the view engine
// router.set( 'views', 'views' )
// router.set( 'view engine', 'pug' )



/* GET city page. */
router.get('/', function(req, res) {

db.country.findAll({

      include: [db.city, db.cityTip]
    })
        })
//         ,
//
// ])
.then(function(list) {
    console.log(list)
  res.render('city'
  , {
    countries: list
  })
// })
})
})


module.exports = router;
