var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize')
var db = require('../modules/database')

router.post('/ajaxSearch', function(req, res){
	var storePlaces = [];
	var searchTyping = req.body.searchTyping.toLowerCase()
	
	db.city.findAll({
		include: [db.country]
	}).then(function(allcities) {
		// console.log('allcities ' + allcities)
		for(var i=0; i<allcities.length; i++ ){
			var cityNames = allcities[i].name.toLowerCase();
			var countryNames = allcities[i].country.name.toLowerCase();

			var inputCountry = countryNames.indexOf(searchTyping);
			var inputCity = cityNames.indexOf(searchTyping);

			if( inputCountry != -1 || inputCity != -1 ) {
				storePlaces.push(allcities[i])
				console.log('[i]' + allcities[i].name + allcities[i].country.name)
			}
			
		}res.send(storePlaces)
	})
})




router.post('/searchResult', function(req, res){
	var storePlaces = [];
	var searchTyping = req.body.searchTyping.toLowerCase()
	
	db.city.findAll({
		include: [db.country]
	}).then(function(allcities) {

		for(var i=0; i<allcities.length; i++ ){
			var cityNames = allcities[i].name.toLowerCase();
			var countryNames = allcities[i].country.name.toLowerCase();

			var inputCountry = countryNames.indexOf(searchTyping);
			var inputCity = cityNames.indexOf(searchTyping);

			if( inputCountry != -1 ) {
				storePlaces.push(allcities)
			}

			if( inputCity != -1 ) {
				storePlaces.push(allcities)
			}
		}
		res.redirect('./citytip/cityTip')
	})
})




module.exports = router;
