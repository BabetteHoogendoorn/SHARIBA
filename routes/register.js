var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.get('/', function(request, response) {
	response.render('register');
});


router.post('/', bodyParser.urlencoded({extended: true}), function(request, response) {
	user.create({
		name: request.body.name,
		email: request.body.email,
		password: request.body.password
	}).then(function(){
		if (typeof(user) == 'undefined'){
  			response.redirect('/login')
  		} if (typeof(user) !== 'undefined') {
  			response.redirect('/?message=' + encodeURIComponent("This user already exists"));
		return;
  		}

	});
});

module.exports = router;