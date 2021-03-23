const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.post('/', async (request, response, next) => {

    const body = request.body
    if (body.password === undefined || body.password.length === 0 || !body.password) {
        return response.status(401).send({ error: 'Password is missing.' })
    }
    else if (body.password.length < 6) {
        return response.status(401).send({ error: 'Password must be at least 6 characters in length.' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const user = await User.findOne({ where: { email: body.email } }) // check if a user exists under the email

    if (user === null) {
        User.create({ 
            email: body.email,
            passwordHash
        })
        .then((user) => {
            response.json(user)
        })
        .catch(exception => {
            next(exception)
        })
    }
    else {
        return response.status(401).json({ error: 'Email has been used already.' })
    }
    
})

module.exports = usersRouter