require('dotenv').config()
const { Sequelize } = require('sequelize')

const PORT = process.env.PORT

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

module.exports = {
    PORT, sequelize
}