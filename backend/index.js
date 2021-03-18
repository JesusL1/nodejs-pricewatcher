require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())
const usersRouter = require('./controllers/users')
app.use('/users', usersRouter)
const webScraper = require('./web_scraper')
app.use(express.static('build'))


app.get('/:url', (request, response) => {
  const product = webScraper.selectParse(request.params.url)
    .then(product => {
        console.log('Product: ', product)
        response.json(product)
    })
    .catch(error => {
        console.log('app: ', error.message)
        return response.status(400).json({ error: 'invalid product URL' })
    })
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'TypeError') {
    return response.status(400).send({ error: 'invalid product URL' })
  }
  else if (error.name === 'SequelizeValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)