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
				//console.log('[i]' + allcities[i].name + allcities[i].country.name)
			}
			
		}res.send(storePlaces)
	})
})




router.post('/', function(req, res){
	var searchTyping = req.body.searchTyping.toLowerCase()
	var city =[]

	db.city.findAll({
		include: [{model: db.country}, {model: db.cityTip}]
	}).then(function(allcities) {

		for(var i=0; i<allcities.length; i++ ){
			var cityNames = allcities[i].name.toLowerCase();
			var countryNames = allcities[i].country.name.toLowerCase();

			var inputCountry = countryNames.indexOf(searchTyping);
			var inputCity = cityNames.indexOf(searchTyping);

			if( searchTyping === cityNames || (searchTyping === cityNames + ' ' + countryNames) ) {
				console.log('scoooooreeeeeee ' + cityNames + ' ' + countryNames)
				city.push(allcities[i])
				// res.send(allcities[i])
				// res.render('citytip', {
				// 	city: allcities[i]
				// })
				return city
			} else if ( searchTyping === countryNames ){
				res.redirect('/city')
			}
		}
	}).then(function(city){
		console.log(city[0])
			res.render('citytip', {
				city: city[0]
			})
		})
})




module.exports = router;
