const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/config')
const User = require('../models/user')


const PriceAlert = sequelize.define('PriceAlert', {
  productURL: {
    type: DataTypes.STRING,
    allowNull: false
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  productPrice: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  productImg: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
    timestamps: false
});

User.hasMany(PriceAlert, {  
  foreignKey: {
    name: 'user_email', // change default name of foreign_key
    allowNull: false // PriceAlert table must have a User for each Alert
  }
})

PriceAlert.belongsTo(User, {
  foreignKey: {
    name: 'user_email', 
    allowNull: false
  }
})


module.exports = PriceAlert