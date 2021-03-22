const webScraper = require('../utils/web_scraper')
const scrapeRouter = require('express').Router()

scrapeRouter.get('/:url', (request, response) => {
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


module.exports = scrapeRouter