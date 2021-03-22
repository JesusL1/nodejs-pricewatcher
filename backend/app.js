const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const scrapeRouter = require('./controllers/scrape')
const middleware = require('./utils/middleware')


app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use('/users', usersRouter)
app.use('/login', loginRouter)
app.use('/scrape', scrapeRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app