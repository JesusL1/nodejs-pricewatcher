const webScraper = require('../utils/web_scraper')
const scrapeRouter = require('express').Router()

scrapeRouter.get('/:url', (request, response, next) => {
    const product = webScraper.selectParse(request.params.url)
        .then(product => {
            console.log('Product: ', product)
            response.json(product)
        })
        .catch(error => {
            next(error)
            return response.status(400).json({ error: 'invalid product URL' })
        })
})


module.exports = scrapeRouter