var pg = require('pg');
// container object
var db = {
	mod: {}
}

//set up sql
var pg = require('pg');
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
db.user = db.conn.define('users', {
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

db.country = db.conn.define('country', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, Infinity]
    },
  }
})

db.city = db.conn.define('city', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 55]
    }
  }
})

db.cityTip = db.conn.define('cityTip', {
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

db.country.hasMany(db.city)
db.city.belongsTo(db.country)
db.user.hasMany(db.cityTip)
db.cityTip.belongsTo(db.user)
db.city.hasMany(db.cityTip)


db.conn.sync({force: true
}).then(function() {
	console.log('sync done')
}).then(function(){
	Promise.all([
		db.country.create({
			name: 'Austria'
		}).then(function(thecountry){
			city.create({
				name:'Vienna',
				countryId: thecountry.id
			})
		}),
		db.country.create({
			name:'Belgium'
		}).then(function(thecountry){
			db.city.create({
				name:'Brussels',
				countryId: thecountry.id
			}).then(function(thecity){
				db.cityTip.create({
					title:'This little guy',
					body:'He pees in a fountain',
					user_id: 2
				})
			})
		}),

		db.country.create({
			name:'Bulgaria'
		}).then(function(thecountry){
			db.city.create({
				name:'Sofia',
				countryId: thecountry.id
			})
		}),
		db.country.create({
			name:'Croatia'
		}).then(function(thecountry){
			db.city.create({
				name:'Zagreb',
				countryId: thecountry.id
			})
		}),
		db.country.create({
			name:'Cyprus Republic'
		}).then(function(thecountry){
			db.city.create({
				name:'Nicosia',
				countryId: thecountry.id
			})
		}),
		db.country.create({
			name:'Czech Republic'
		}).then(function(thecountry){
			db.city.create({
				name:'Prague',
				countryId: thecountry.id
			}).then(function(thecity){
				db.cityTip.create({
					title:'drinks at this bar',
					body:'Come here for the cheapest beers',
					user_id: 3
				})
			})
		}),
		db.country.create({
			name:'Denmark'
		}).then(function(thecountry){
			db.city.create({
				name:'Copenhagen',
				countryId: thecountry.id
			})
		}),
		db.country.create({
			name:'Estonia'
		}).then(function(thecountry){
			db.city.create({
				name:'Tallinn',
				countryId: thecountry.id
			})
		}),
		db.country.create({
			name:'Finland'
		}).then(function(thecountry){
			db.city.create({
				name:'Helsinki',
				countryId: thecountry.id
			})
		}),
		db.country.create({
			name:'France'
		}).then(function(thecountry){
			db.city.create({
				name:'Paris',
				countryId: thecountry.id
			})
		}),
		db.country.create({
			name:'Germany'
		}).then(function(thecountry){
			db.city.create({
				name:'Berlin',
				countryId: thecountry.id
			})
		}),
		db.country.create({
			name:'Greece'
		}).then(function(thecountry){
			db.city.create({
				name:'Athens',
				countryId: thecountry.id
			})
		}),
		db.country.create({
			name:'Hungary'
		}).then(function(thecountry){
			db.city.create({
				name:'Budapest',
				countryId: thecountry.id
			})
		}),
		db.country.create({
			name:'Ireland'
		}).then(function(thecountry){
			db.city.create({
				name:'Dublin',
				countryId: thecountry.id
			})
		}),
		db.country.create({
			name:'Italy'
		}).then(function(thecountry){
			db.city.create({
				name:'Rome',
				countryId: thecountry.id
			})
		}),
		db.country.create({
			name:'Latvia'
		}).then(function(thecountry){
			db.city.create({
				name:'Riga',
				countryId: thecountry.id
			})
		}),
		db.country.create({
			name:'Lithuania'
		}).then(function(thecountry){
			db.city.create({
				name:'Vilnius',
				countryId: thecountry.id
			})
		}),
		db.country.create({
			name:'Luxembourg'
		}).then(function(thecountry){
			db.city.create({
				name:'Luxembourg',
				countryId: thecountry.id
			})
		}),
		db.country.create({
			name:'Malta'
		}).then(function(thecountry){
			db.city.create({
				name:'Valletta',
				countryId: thecountry.id
			})
		}),
		db.country.create({
			name:'Netherlands'
		}).then(function(thecountry){
			db.city.create({
				name:'Amsterdam',
				countryId: thecountry.id
			}).then(function(anothercity) {
				db.city.create({
					name:'Eindhoven',
					countryId: thecountry.id
				}).then(function(thecity){
					db.cityTip.create({
						title:'Top spot',
						body:'This place is awesome!',
						user_id: 1
					})
				})
			})
		}),
		db.country.create({
			name:'Poland'
		}).then(function(thecountry){
			db.city.create({
				name:'Warsaw',
				countryId: thecountry.id
			})
		}),
		db.country.create({
			name:'Portugal'
		}).then(function(thecountry){
			db.city.create({
				name:'Lisbon',
				countryId: thecountry.id
			})
		}),
		db.country.create({
			name:'Romania'
		}).then(function(thecountry){
			db.city.create({
				name:'Bucharest',
				countryId: thecountry.id
			})
		}),
		db.country.create({
			name:'Slovakia'
		}).then(function(thecountry){
			db.city.create({
				name:'Bratislava',
				countryId: thecountry.id
			})
		}),
		db.country.create({
			name:'Slovena'
		}).then(function(thecountry){
			db.city.create({
				name:'Ljubljana',
				countryId: thecountry.id
			})
		}),
		db.country.create({
			name:'Spain'
		}).then(function(thecountry){
			db.city.create({
				name:'Madrid',
				countryId: thecountry.id
			})
		}),
		db.country.create({
			name:'Sweden'
		}).then(function(thecountry){
			db.city.create({
				name:'Stockholm',
				countryId: thecountry.id
			})
		}),
		db.country.create({
			name:'United Kingdom'
		}).then(function(thecountry){
			db.city.create({
				name:'London',
				countryId: thecountry.id
			})
		}),
		db.country.create({
			name:'Vatican City'
		}).then(function(thecountry){
			db.city.create({
				name:'Vatican City',
				countryId: thecountry.id
			}).then(function(thecity){
				db.cityTip.create({
					title:'This place is holy',
					body:'I have seen the pope, such a nice guy!',
					user_countryId: 4
				})
			})
		})
	])
})


module.exports = db
