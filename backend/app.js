const config = require('./utils/config')
const express = require('express')
const path = require('path');
const app = express()
const cors = require('cors')
const usersRouter = require('./controllers/users')
const priceAlertsRouter = require('./controllers/priceAlerts')
const loginRouter = require('./controllers/login')
const scrapeRouter = require('./controllers/scrape')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const { sequelize } = require('./utils/config')


sequelize.sync().then(() => {
  logger.info("All Sequelize models were synchronized successfully.");
})
.catch(error=> {
  logger.error(error)
})


app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)


app.use('/users', usersRouter)
app.use('/scrape', scrapeRouter)
app.use('/price-alerts', priceAlertsRouter)
app.use('/login', loginRouter)


// catch-all to serve app with client-side routing 
// (More Info: https://create-react-app.dev/docs/deployment#serving-apps-with-client-side-routing)
app.use('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app