const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())
const webScraper = require('./web_scraper')
const port = process.env.PORT || 3001

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

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


app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`)
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
  next(error)
}
app.use(errorHandler)