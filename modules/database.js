// container object
var db = {
	mod: {}
}

//set up sql
var Sequelize = require('sequelize');
db.conn = new Sequelize('shariba', process.env.POSTGRES_USER,
	process.env.POSTGRES_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    timestamps: false
  }
});

//Models
user = db.conn.define('users', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 50]
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 55]
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, Infinity]
    },
  }
}, {
  freezeTableName: true,
  instanceMethods: {
    generateHash: function(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    },
    validPassword: function(password) {
      return bcrypt.compareSync(password, this.password);
    },
  }
});

country = db.conn.define('countries', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, Infinity]
    },
  }
})

city = db.conn.define('cities', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 55]
    }
  }
})

cityTip = db.conn.define('cityTips', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, Infinity]
    },
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, Infinity]
    },
  },
  user_id: Sequelize.INTEGER
});


//establish relationships
country.hasMany(city)
city.belongsTo(country)
//city.hasMany(cityTip)

//synchronize with database
// db.conn.sync({
//  force: true
// }).then(function() {
//  console.log('sync done')
// });

db.conn.sync({force: true
}).then(function(){
	Promise.all([
		country.create({
			name: 'Austria'
		}).then(function(thecountry){
			city.create({
				name:'Vienna',
				countryId: thecountry.id
			})
		}),
		country.create({
			name:'Belgium'
		}).then(function(thecountry){
			city.create({
				name:'Brussels',
				countryId: thecountry.id
			}).then(function(thecity){
				cityTip.create({
					title:'This little guy',
					body:'He pees in a fountain',
					user_id: 2
				})
			})
		}),
		country.create({
			name:'Bulgaria'
		}).then(function(thecountry){
			city.create({
				name:'Sofia',
				countryId: thecountry.id
			})
		}),
		country.create({
			name:'Croatia'
		}).then(function(thecountry){
			city.create({
				name:'Zagreb',
				countryId: thecountry.id
			})
		}),
		country.create({
			name:'Cyprus Republic'
		}).then(function(thecountry){
			city.create({
				name:'Nicosia',
				countryId: thecountry.id
			})
		}),
		country.create({
			name:'Czech Republic'
		}).then(function(thecountry){
			city.create({
				name:'Prague',
				countryId: thecountry.id
			})then(function(thecity){
				cityTip.create({
					title:'drinks at this bar',
					body:'Come here for the cheapest beers',
					user_id: 3
				})
			})
		}),
		country.create({
			name:'Denmark'
		}).then(function(thecountry){
			city.create({
				name:'Copenhagen',
				countryId: thecountry.id
			})
		}),
		country.create({
			name:'Estonia'
		}).then(function(thecountry){
			city.create({
				name:'Tallinn',
				countryId: thecountry.id
			})
		}),
		country.create({
			name:'Finland'
		}).then(function(thecountry){
			city.create({
				name:'Helsinki',
				countryId: thecountry.id
			})
		}),
		country.create({
			name:'France'
		}).then(function(thecountry){
			city.create({
				name:'Paris',
				countryId: thecountry.id
			})
		}),
		country.create({
			name:'Germany'
		}).then(function(thecountry){
			city.create({
				name:'Berlin',
				countryId: thecountry.id
			})
		}),
		country.create({
			name:'Greece'
		}).then(function(thecountry){
			city.create({
				name:'Athens',
				countryId: thecountry.id
			})
		}),
		country.create({
			name:'Hungary'
		}).then(function(thecountry){
			city.create({
				name:'Budapest',
				countryId: thecountry.id
			})
		}),
		country.create({
			name:'Ireland'
		}).then(function(thecountry){
			city.create({
				name:'Dublin',
				countryId: thecountry.id
			})
		}),
		country.create({
			name:'Italy'
		}).then(function(thecountry){
			city.create({
				name:'Rome',
				countryId: thecountry.id
			})
		}),
		country.create({
			name:'Latvia'
		}).then(function(thecountry){
			city.create({
				name:'Riga',
				countryId: thecountry.id
			})
		}),
		country.create({
			name:'Lithuania'
		}).then(function(thecountry){
			city.create({
				name:'Vilnius',
				countryId: thecountry.id
			})
		}),
		country.create({
			name:'Luxembourg'
		}).then(function(thecountry){
			city.create({
				name:'Luxembourg',
				countryId: thecountry.id
			})
		}),
		country.create({
			name:'Malta'
		}).then(function(thecountry){
			city.create({
				name:'Valletta',
				countryId: thecountry.id
			})
		}),
		country.create({
			name:'Netherlands'
		}).then(function(thecountry){
			city.create({
				name:'Amsterdam',
				countryId: thecountry.id
			}).then(function(anothercity) {
				city.create({
					name:'Eindhoven',
					countryId: thecountry.id
				}).then(function(thecity){
					cityTip.create({
						title:'Top spot',
						body:'This place is awesome!',
						user_id: 1
					})
				})
			})
		}),
		country.create({
			name:'Poland'
		}).then(function(thecountry){
			city.create({
				name:'Warsaw',
				countryId: thecountry.id
			})
		}),
		country.create({
			name:'Portugal'
		}).then(function(thecountry){
			city.create({
				name:'Lisbon',
				countryId: thecountry.id
			})
		}),
		country.create({
			name:'Romania'
		}).then(function(thecountry){
			city.create({
				name:'Bucharest',
				countryId: thecountry.id
			})
		}),
		country.create({
			name:'Slovakia'
		}).then(function(thecountry){
			city.create({
				name:'Bratislava',
				countryId: thecountry.id
			})
		}),
		country.create({
			name:'Slovena'
		}).then(function(thecountry){
			city.create({
				name:'Ljubljana',
				countryId: thecountry.id
			})
		}),
		country.create({
			name:'Spain'
		}).then(function(thecountry){
			city.create({
				name:'Madrid',
				countryId: thecountry.id
			})
		}),
		country.create({
			name:'Sweden'
		}).then(function(thecountry){
			city.create({
				name:'Stockholm',
				countryId: thecountry.id
			})
		}),
		country.create({
			name:'United Kingdom'
		}).then(function(thecountry){
			city.create({
				name:'London',
				countryId: thecountry.id
			})
		}),
		country.create({
			name:'Vatican City'
		}).then(function(thecountry){
			city.create({
				name:'Vatican City',
				countryId: thecountry.id
			})then(function(thecity){
				cityTip.create({
					title:'This place is holy',
					body:'I have seen the pope, such a nice guy!',
					user_id: 4
				})
			})
		})
	])
})


module.exports = db
