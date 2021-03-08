import React, { useState } from 'react'
import axios from 'axios'
import SearchResult from './components/SearchResult'
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
    const request = axios.get(`http://localhost:3001/${encodeURIComponent(searchTerm)}`)
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
      <Navbar bg="dark" variant="dark">
        <Nav className="mr-auto">
          <Nav.Link href="#Login">Login</Nav.Link>
          <Nav.Link href="#watchlist">Watchlist</Nav.Link>
          <Nav.Link href="#account">Account</Nav.Link>
        </Nav>
        <Form onSubmit={search} inline>
          <FormControl className="mr-sm-2" id="productInput" type="url" value={searchTerm} onChange={handleSearchChange} onFocus={handleFocus} placeholder="https://www.example.com/product-page"/>
          <Button variant="outline-info" type="submit">Search</Button>
        </Form>
      </Navbar>

      <LoadingSpinner/>
      <SearchResult product={{name: productName, price: productPrice, img: productImg }} success={success} /> 
      {/* <h1 className="ml4">PriceWatcher</h1> */}
      {/* <Form onSubmit={search}>
        <Form.Group className="form-inline">
          <Form.Control id="productInput" type="url" value={searchTerm} onChange={handleSearchChange} onFocus={handleFocus} placeholder="https://www.example.com/product-page" />
          <Button variant="primary" type="submit">Search</Button>
        </Form.Group>
      </Form> */}
      {/* <SearchResult product={{name: productName, price: productPrice, img: productImg }} /> */}
    </div>
  )
}

export default App;