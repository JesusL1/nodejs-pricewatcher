const { Sequelize, DataTypes } = require('sequelize');
const User = require('../models/user')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
})


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

User.sync().then(() => {
  console.log('User model synchronized successfully.')
})


sequelize.sync().then(() => {
  console.log("All Sequelize models were synchronized successfully.");
})



module.exports = PriceAlert