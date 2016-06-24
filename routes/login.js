var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var session = require('express-session');
var Sequelize = require('sequelize');
var db = require('../modules/database.js');
var pg = require('pg');

router.use(session({
  secret: 'oh wow very secret much security',
  resave: true,
  saveUninitialized: false
}));

router.get('/', function(request, response) {
	response.render('login', {title: 'Tipster Login'});
});


router.post('/login', function (req, res){
	if(req.body.name.length === 0) {
		res.redirect('/?message=' + encodeURIComponent("Please fill out your email address."));
		return;
	}

	if(req.body.password.length === 0) {
		res.redirect('/?message=' + encodeURIComponent("Please fill out your password."));
		return;
	}

	db.user.findOne({
		where: {
			name: req.body.name
		}
	}).then(function (theuser) {
		if (theuser !== null && req.body.password === theuser.password) {
			req.session.user = theuser;
			res.redirect('/profile');
		} else {
			res.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
		}
	}, function (error) {
		res.redirect('/?message=' + encodeURIComponent("kipppp"));
	});
});


module.exports = router;
