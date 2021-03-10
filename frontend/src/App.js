import React, { useState } from 'react'
import axios from 'axios'
import SearchResult from './components/SearchResult'
// import logo from '../public/piggy-bank-512.png'
import { Button, Form, FormControl, Nav, Navbar, Spinner } from 'react-bootstrap'


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
      <Navbar id="navbar" bg="dark" variant="dark">
        <Nav className="mr-auto">
          <Nav.Link className="link" href="#Login">Login</Nav.Link>
          <Nav.Link className="link" href="#watchlist">Watchlist</Nav.Link>
          <Nav.Link className="link" href="#account">Account</Nav.Link>
        </Nav>
        <h1 className="ml4">PriceWatcher <img id="logo" src="piggy-bank-512.png" width="40px" height="40px" alt=""></img> </h1>
        <Form onSubmit={search} inline>
          <FormControl className="mr-sm-2" id="productInput" type="url" value={searchTerm} onChange={handleSearchChange} onFocus={handleFocus} placeholder="https://www.example.com/product-page"/>
          <Button variant="outline-info" type="submit">Search</Button>
        </Form>
      </Navbar>
      <LoadingSpinner/>
      <SearchResult product={{name: productName, price: productPrice, img: productImg }} success={success} /> 
    </div>
  )
}

export default App;