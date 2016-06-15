var express = require('express');
var router = express.Router();

router.get('/profile', function(request, response) {
	var user = request.session.user;
	if (user === undefined) {
		response.redirect('/?message=' + encodeURIComponent("Please log in to view your profile."));
	} else {
		var ID = request.session.user.id;
		message.findAll({
			where: {
				user_id: ID,
			}
		}).then(function(messages) {
			var Data = messages.map(function(appmessage) {
				return {
					title: appmessage.dataValues.title,
					body: appmessage.dataValues.body,
					user_id: appmessage.dataValues.user_id
				}


			})
			var allOwnMessages = Data;

			console.log(allOwnMessages);
			//console.log(allComments);
			response.render('profile', {
				allOwnMessages: allOwnMessages,
				name: request.session.user.name
			});
		});
	}
});

module.exports = router;