var express = require('express');
var router = express.Router();
var pg = require('pg');
var Sequelize = require('sequelize');
var session = require('express-session');
var db = require('../modules/database');

router.use(session({
  secret: 'oh wow very secret much security',
  resave: true,
  saveUninitialized: false
}));

router.get('/', function(request, response) {
	var user = request.session.user;
	if (user === undefined) {
		response.redirect('/?message=' + encodeURIComponent("Please log in to view your profile."));
	} else {
		var ID = request.session.user.id;
		db.cityTip.findAll({
			where: {
				user_id: ID,
			}
		}).then(function(cityTips) {
			var Data = cityTip.map(function(profiletips) {
				return {
					title: profiletips.dataValues.title,
					body: profiletips.dataValues.body,
					user_id: profiletips.dataValues.user_id
				}


			})
			var usersCityTips = Data;

			console.log(usersCityTips);
			//console.log(allComments);
			response.render('profile', {
				title: 'Tipster Profile',
				usersCityTips: usersCityTips,
				name: request.session.user.name
			});
		});
	}
});

module.exports = router;