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
  console.log('request made it here')
  const url = new URL(request.params.url)
  
  if (url.hostname in webScraper.stores) {
    webScraper.selectParse(url)
      .then(product => {
        console.log('Product: ', product)
        response.json(product)
      })
  }
  else {
    console.log('INVALID WEBSITE')
    response.send('INVALID WEBSITE')
  }
})


app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`)
})