var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.get('/login', function(request, response) {
	response.render('login', {});
});


router.post('/login', bodyParser.urlencoded({
	extended: true
}), function(request, response) {
	if (request.body.email.length === 0) {
		response.redirect('/?message=' + encodeURIComponent("Please fill out your email address."));
		return;
	}

	if (request.body.password.length === 0) {
		response.redirect('/?message=' + encodeURIComponent("Please fill out your password."));
		return;
	}

	user.findOne({
		where: {
			email: request.body.email
		}
	}).then(function(user) {
		var hashSecurePassword = request.body.password;
		bcrypt.compare(hashSecurePassword, user.password.toString(), function(err, result) {
			if (user !== null && request.body.password === user.password) {
				request.session.user = user;
				response.redirect('/');
			} else {
				response.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
			}
		}, function(error) {
			response.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
		});
	});
});

module.exports = router;