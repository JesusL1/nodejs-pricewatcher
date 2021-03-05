import React, { useState } from 'react'
import axios from 'axios'
import SearchResult from './components/SearchResult'
import {Form, Button} from 'react-bootstrap'


const App = () => {

  const [ searchTerm, setSearchTerm ] = useState('')
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
    axios.get(`http://localhost:3001/${encodeURIComponent(searchTerm)}`)
      .then(res => {
          const p = res.data
          console.log('Product: ', p)
          setProductName(p.name)
          setProductPrice(p.price)
          setProductImg(p.img)
      })
  }

  return (
    <div className="container">
      <h1>PriceWatcher</h1>
      <Form onSubmit={search}>
        <Form.Group className="form-inline">
          <Form.Control id="productInput" type="url" value={searchTerm} onChange={handleSearchChange} onFocus={handleFocus} placeholder="https://www.exampleStore.com/productPage" />
          <Button variant="primary" type="submit">Search</Button>
        </Form.Group>
      </Form>
      {/* <form onSubmit={search}>          
        <input type="url" value={searchTerm} onChange={handleSearchChange} placeholder="Enter Product URL"/> 
        <button type="submit">Search</button>
      </form>  */}
      <SearchResult product={{name: productName, price: productPrice, img: productImg }} />
      <p>{searchTerm}</p>
    </div>
  )
}

export default App;