import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import DisplayValidation from './DisplayValidation'


const Login = ({loginService, setUser}) => {

  const [ email, setEmail ] = useState('')   
  const [ password, setPassword ] = useState('')
  const [ validateMessage, setValidateMessage ] = useState('')
  const history = useHistory()

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = (event) => {    
    event.preventDefault()    
    loginService.login({
      email, password
    })
      .then((returnedUser) => {
        window.localStorage.setItem(
          'loggedPriceWatcherUser', JSON.stringify(returnedUser)
        )
        setUser(returnedUser)
        history.push('/')
      })
      .catch(error => {
        console.log(error.response.data.error)
        setValidateMessage(error.response.data.error)
      })
  }

  return (
    <div>
        <Form id="login" onSubmit={handleLogin}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control value={email} onChange={handleEmailChange} type="email" required placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control value={password} onChange={handlePasswordChange} type="password" required placeholder="Password" />
          </Form.Group>
          {/* <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group> */}
          <Button variant="primary" type="submit">Sign in</Button>
          <Link id="signup" to="/register">New around here? Sign up</Link>
          <DisplayValidation validateMessage={validateMessage} />
        </Form>
      </div>
  )
}

export default Login