var express = require('express');
var router = express.Router();

/* GET city page. */
router.get('/', function(req, res) {
  res.render('city', { title: 'Express' });
});



module.exports = router;





  Promise.all([
    country.create({
      name: 'Netherlands'
    }).then(function(thecountry){
      city.create({
        name:'Amsterdam',
        countryId: thecountry.id}
        ),
      city.create({
        name:'Eindhoven',
        countryId: thecountry.id}
        ).then(function(thecity){
          cityTip.create({
            title:'Top spot',
            body:'This place is awesome!',
            user_id: 1
          })
        })
      }),
    country.create({
      name:'Austria'
    }).then(function(thecountry){
     city.create({
      name:'Salzburg',
      countryId: thecountry.id
    })
   })
    ])
})
