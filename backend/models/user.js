const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});


const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false, // allowNull defaults to true
    validate: {
      isEmail:true
    }
  },
  passwordHash: {
    type: String
  },
  }, {
  // Other model options go here
  timestamps: false
});

// remove passwordHash from being displayed in JSON output
User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get())
  delete values.passwordHash
  return values
}

sequelize.sync().then(() => {
  console.log("All models were synchronized successfully.");
})

module.exports = User