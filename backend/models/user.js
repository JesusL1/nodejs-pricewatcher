const { DataTypes } = require('sequelize')
const { sequelize } = require('../utils/config')


const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement:true
  },
  email: {
    primaryKey:true,
    type: DataTypes.STRING,
    allowNull: false, // allowNull defaults to true
    unique: true,
    validate: {
      isEmail:true
    }
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  }
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


module.exports = User