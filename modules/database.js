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
db.cityTip.hasMany(db.user)
//city.hasMany(cityTip)

//synchronize with database
db.conn.sync({
 force: true
}).then(function() {
 console.log('sync done')
 Promise.all([
    db.country.create({
      name: 'Netherlands'
    }).then(function(thecountry){
      db.city.create({
        name:'Amsterdam',
        countryId: thecountry.id}
        ),
      db.city.create({
        name:'Eindhoven',
        countryId: thecountry.id}
        ).then(function(thecity){
          db.cityTip.create({
            title:'Top spot',
            body:'This place is awesome!',
            user_id: 1
          })
        })
      }),
    db.country.create({
      name:'Austria'
    }).then(function(thecountry){
     db.city.create({
      name:'Salzburg',
      countryId: thecountry.id
    })
   })
    ])
});

module.exports = db