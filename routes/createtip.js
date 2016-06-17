var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.get('/login', function(request, response) {
	response.render('login', {});
});

app.get('/createtip', function(request, response) {
	var user = request.session.user;
	if (user === undefined) {
		response.redirect('/?message=' + encodeURIComponent("Please log in."));
	} else {
		response.render('createtip', {});
	};
});


app.post('/createtip', bodyParser.urlencoded({
	extended: true
}), function(request, response) {
	var ID = request.session.user.id;

	cityTip.create({
		title: request.body.title,
		body: request.body.body,
		user_id: ID

	}).then(function() {
		response.redirect('/createtip')
	});
});

module.exports = router;