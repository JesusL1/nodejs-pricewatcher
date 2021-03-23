const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const tokenExtractor = (request, response, next) => {  
    const authorization = request.get('Authorization')  
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {    
      request.token = authorization.substring(7)  
    } else {
      request.token = null
    }
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'TypeError') {
      return response.status(400).send({ error: 'invalid product URL' })
    }
    else if (error.name === 'SequelizeValidationError') {
      return response.status(400).json({ error: error.message })
    }
    else if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({ error: 'invalid token' })
    } 
    else if (error.name === 'TokenExpiredError') {    
      return response.status(401).json({ error: 'token expired' })
    }
    logger.error(error.message)
    next(error)
}

module.exports = {
    tokenExtractor,
    requestLogger,
    unknownEndpoint,
    errorHandler
}