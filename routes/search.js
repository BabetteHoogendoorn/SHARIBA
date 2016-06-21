var express = require('express');
var router = express.Router();

router.post('/ajaxSearch', function(req, res){
	var totalPlaces = [];
	var searchTyping = req.body.searchTyping.toLowerCase()

	db.city.findAll({
		include: [country]
	}).then(function(allcities) {

		for(var i=0; i<allcities.length; i++ ){

			var cityNames = city[i].name.toLowerCase();
			var countryNames = city[i].country.name.toLowerCase();

			var inputCountry = countryNames.indexOf(searchTyping);
			var inputCity = cityNames.indexOf(searchTyping);

			if( inputCountry != -1 ) {
				var foundCountry = country[i];
				city.findAll ({
					where: {
						countryId: foundCountry.id
					}
				}).then(function(allcities){
					totalPlaces.push(allcities)
				})
			}
			if( inputCity != -1 ) {
				var foundCity = city[i]; 
				City.findAll ({
					where: {
						id: foundCity.id
					}
				}).then(function(allcities){
					totalPlaces.push(allcities)
				})
			}
		}
		res.send(totalPlaces)
	})
})



router.post('/searchResult', function(req, res){
	console.log('hi i am found')
	var storePlaces = [];
	var searchTyping = req.body.searchTyping.toLowerCase()

	db.city.findAll({
		include: [country]
	}).then(function(allcities) {

		for(var i=0; i<allcities.length; i++ ){

			var cityNames = city[i].name.toLowerCase();
			var countryNames = city[i].country.name.toLowerCase();

			var inputCountry = countryNames.indexOf(searchTyping);
			var inputCity = cityNames.indexOf(searchTyping);

			if( inputCountry != -1 ) {
				var foundCountry = country[i];
				city.findAll ({
					where: {
						countryId: foundCountry.id
					}
				}).then(function(allcities){
					storePlaces.push(allcities)
				})
			}
			if( inputCity != -1 ) {
				var foundCity = city[i]; 
				City.findAll ({
					where: {
						id: foundCity.id
					}
				}).then(function(allcities){
					storePlaces.push(allcities)
				})
			}
		}
		res.send(storePlaces)
	})
})




module.exports = router;
