var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var session = require('express-session');
var Sequelize = require('sequelize');
var db = require('../modules/database.js');
var pg = require('pg');


router.get('/', function(request, response) {
	response.render('login', {title: 'Tipster Login'});
});


router.post('/', function (req, res){
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
	}).then(function (user) {
		if (db.user !== null && req.body.password === db.user.password) {
			req.session.db.user = db.user;
			res.redirect('/profile');
		} else {
			res.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
		}
	}, function (error) {
		res.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
	});
});


module.exports = router;