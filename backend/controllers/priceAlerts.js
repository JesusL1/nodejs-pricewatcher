const jwt = require('jsonwebtoken')
const priceAlertsRouter = require('express').Router()
const PriceAlert = require('../models/priceAlert')


priceAlertsRouter.get('/', async (request, response, next) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        const priceAlerts = await PriceAlert.findAll({
            where: {
                user_email: decodedToken.email
            }
        })
        response.json(priceAlerts)
    } catch (exception) {
        next(exception)
    }
})

priceAlertsRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        
        if (!request.token || !decodedToken.id) {    
            return response.status(401).json({ error: 'token missing or invalid' })  
        }  

        if (body.productURL === undefined || body.productURL.length === 0 || !body.productURL) {
            return response.status(401).send({ error: 'productURL is missing.' })
        }
        else if (body.productName === undefined || body.productName.length === 0 || !body.productName) {
            return response.status(401).send({ error: 'productName is missing.' })
        }
        else if (body.productPrice === undefined || !body.productPrice) {
            return response.status(401).send({ error: 'productPrice is missing.' })
        }

        const priceAlert = await PriceAlert.findOne({ where: { user_email: decodedToken.email, productURL: body.productURL } }) // check if a price alert exists under the email
        if (priceAlert === null) {
            const pAlert = await PriceAlert.create({ 
                user_email: decodedToken.email,
                productURL: body.productURL,
                productName: body.productName,
                productPrice: body.productPrice,
                productImg: body.productImg
            })
            return response.json(pAlert)
        }
        else {
            return response.status(401).json({ error: 'This Price Alert has been created already.' })
        }

    } catch (exception) {
        next(exception)
    }
})

priceAlertsRouter.delete('/:url', async (request, response, next) => {
    console.log(request.params.url)
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decodedToken.id) {    
            return response.status(401).json({ error: 'token missing or invalid' })  
        } 

        console.log('made it here', decodeURI(request.params.url))

        const priceAlert = await PriceAlert.destroy({
            where: {
                user_email: decodedToken.email,
                productURL: request.params.url
            }
        })
        response.json(204).end()
    } catch (exception) {
        next(exception)
    }
})

module.exports = priceAlertsRouter