import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router'
import DisplayValidation from './DisplayValidation'


const Register = ({authenticated, registerService, setUser}) => {

    const [ email, setEmail ] = useState('')   
    const [ password, setPassword ] = useState('') 
    const [ confirmPassword, setConfirmPassword ] = useState('')
    const [ validateMessage, setValidateMessage ] = useState('')
    const history = useHistory()

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }
    
    const handleConfirmPassword =(event) => {
        setConfirmPassword(event.target.value)
    }

    const handleRegister = (event) => {
        event.preventDefault()
        if (confirmPassword.length < 6 || password.length < 6) {
            console.log('less than 6')
            setValidateMessage('Password must be at least 6 characters.')
        }
        else if (confirmPassword === password) {
            const userObject = {
                email: email,
                password: password
            }
            registerService(userObject)
            .then(returnedUser => {
                setUser(returnedUser)
                history.push('/')
            })
            .catch(error => {
                setValidateMessage(error.response.data.error)
            })
        }
        else {
            setValidateMessage('Passwords do not match.')
        } 
    }

    if (authenticated) {
        return (
            <p>Logout before trying to create a new account.</p>
        ) 
    }
    else {
        return (
            <div>
                <Form id="login" onSubmit={handleRegister}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control value={email} onChange={handleEmailChange} type="email" required placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password <span style={{fontSize: '0.9rem' }}> (6 characters required)</span> </Form.Label>
                        <Form.Control value={password} onChange={handlePasswordChange} type="password" required placeholder="Password" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control value={confirmPassword} onChange={handleConfirmPassword} type="password" required placeholder="Confirm Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">Register</Button>
                    <DisplayValidation validateMessage={validateMessage} />
                </Form>
            </div>
        ) 
    }
}

export default Register;