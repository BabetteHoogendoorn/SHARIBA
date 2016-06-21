var express = require('express');
var router = express.Router();

/* GET city page. */
router.get('/', function(req, res) {
  res.render('city', { title: 'Express' });
});


//synching with database
sequelize.sync({
  force: true}).then( function(){
    console.log('sync done')

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
          countryId: thecountry.id}
        ),
        city.create({
          name: 'Vienna',
          countryId: thecountry.id}
        }).then(function(thecity){
          cityTip.create({
            title: 'This is the place to be',
            body: 'I really recommend it',
            user_id: 2
          })
          })
        }),
        country.create({
          name: 'Belgium'
        }).then(function(thecountry){
          city.create({
            name: 'Brussel'
            countryId: thecountry.id}
          })then(function(thecity){
            cityTip.create({
              title: 'look at this guy',
              body: 'he is peeing and wears funny clothes',
              user_id: 3
            })
          })
        }),
        })country.create({
          name: 'Germany'
        }).then(function(thecountry){
          city.create({
            name:'Berlin',
            countryId: thecountry.id}
            ),
          city.create({
            name:'Köln',
            countryId: thecountry.id}
            ).then(function(thecity){
              cityTip.create({
                title:'Top spot',
                body:'This place is awesome!',
                user_id: 4
              })
            })
          })
      })
    ])
  })

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
