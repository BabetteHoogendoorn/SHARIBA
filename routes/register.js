var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');


router.get('/', function(req, res) {
  res.render('register', {title: 'Tipster Register'})
});


router.post('/', function (req, res) {
	user.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	}).then(function () {
		res.redirect('/login')
	})
})


module.exports = router;