var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize')
var db = require('../modules/database')

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
				db.city.findAll ({
					where: {
						countryId: foundCountry.id
					}
				}).then(function(allcities){
					totalPlaces.push(allcities)
				})
			}
			if( inputCity != -1 ) {
				var foundCity = city[i]; 
				db.city.findAll ({
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
		include: [db.country]
	}).then(function(allcities) {

		for(var i=0; i<allcities.length; i++ ){
			console.log('de cityyyyyyy ' + allcities)
			var cityNames = allcities[i].name.toLowerCase();
			var countryNames = allcities[i].country.name.toLowerCase();

			var inputCountry = countryNames.indexOf(searchTyping);
			var inputCity = cityNames.indexOf(searchTyping);

			if( inputCountry != -1 ) {
				// var foundCountry = allcities.country[i];
				// db.city.findAll ({
				// 	where: {
				// 		countryId: foundCountry.id
				// 	}
				// }).then(function(allcities){
					storePlaces.push(allcities)
				// })
			}

			if( inputCity != -1 ) {
				// var foundCity = db.city[i]; 
				// db.city.findAll ({
				// 	where: {
				// 		id: foundCity.id
				// 	}
				 // }).then(function(allcities){
					storePlaces.push(allcities)
				//})
			}
		}
		console.log(storePlaces)
		res.send(storePlaces)
	})
})




module.exports = router;
