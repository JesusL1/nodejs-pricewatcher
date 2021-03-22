const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const body = request.body
  
    const user = await User.findOne({ where: { email: body.email } });
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)
  
    if (!(user && passwordCorrect)) {
      return response.status(401).json({ error: 'Invalid username or password' })
    }
  
    const userForToken = {
        email: user.email,
        id: user._id,
    }

    // // token expires in 60*60 seconds, that is, in one hour
    // const token = jwt.sign(    
    //     userForToken,     
    //     process.env.SECRET,    
    //     { expiresIn: 60*60 }  
    // )
  
    const token = jwt.sign(userForToken, process.env.SECRET)
    response.status(200).send({ token, email: user.email })
})

module.exports = loginRouter