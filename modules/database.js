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
db.conn.sync({
 force: false
}).then(function() {
 console.log('sync done')
});

module.exports = db