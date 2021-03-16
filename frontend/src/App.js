import React, { useState } from 'react'
import {
  Switch, Route, Link
} from 'react-router-dom'
import axios from 'axios'
import Home from './components/Home'
import Login from './components/Login'
import SearchResult from './components/SearchResult'
import WatchList from './components/WatchList'
import { Button, Form, FormControl, Nav, Navbar, Spinner } from 'react-bootstrap'
import Register from './components/Register'


const App = () => {

  const [ searchTerm, setSearchTerm ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const [ success, setSuccess ] = useState(false)
  const [ productName, setProductName ] = useState('')
  const [ productPrice, setProductPrice ] = useState('')
  const [ productImg, setProductImg ] = useState('')

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value) 
  }

  const handleFocus = (event) => {
    event.target.select()
  }

  const search = (event) => {
    event.preventDefault()
    axios.get(`/${encodeURIComponent(searchTerm)}`)
      .then(res => {
          const p = res.data
          console.log('Product: ', p)
          if (p.name.length>1 && p.price && p.img.length>1 ) {
            setProductName(p.name)
            setProductPrice(p.price)
            setProductImg(p.img)
            setSuccess(true)
          }
          setLoading(false)
      })
      .catch(error => {
        setLoading(false)
        console.log(error)
      })
      setLoading(true)
  }

  const LoadingSpinner = () => {
    if (loading) {
      return (
        <Spinner id="spinner" animation="border" variant="dark" size="lg" />
      )
    }
    else  {return null}
  }

  return (
    <div>
      <Navbar id="navbar" bg="dark" variant="dark" expand="lg">
        <Navbar.Brand className="ml4">PriceWatcher <img id="logo" src="piggy-bank-512.png" width="40px" height="40px" alt=""></img> </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/login" className="link">Login</Nav.Link>
          <Nav.Link as={Link} to="/" className="link">Home</Nav.Link>
          <Nav.Link as={Link} to="/watchlist" className="link">Watchlist</Nav.Link>
        </Nav>
        <Form onSubmit={search} inline>
          <FormControl className="mr-sm-2" id="productInput" type="url" value={searchTerm} onChange={handleSearchChange} onFocus={handleFocus} placeholder="https://www.example.com/product_page"/>
          <Button variant="outline-info" type="submit">Search</Button>
        </Form>
        </Navbar.Collapse>
      </Navbar>
      <LoadingSpinner/>
      <SearchResult product={{name: productName, price: productPrice, img: productImg }} success={success} /> 

      <Switch>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/watchlist">
          <WatchList/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
      
    </div>
  )
}

export default App;