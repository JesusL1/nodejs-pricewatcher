import React, { useState, useEffect } from 'react'
import { Switch, Route, Link, Redirect, useHistory } from 'react-router-dom'
import { Alert, Button, Form, FormControl, Nav, Navbar, Spinner } from 'react-bootstrap'
import axios from 'axios'
import Home from './components/Home'
import Login from './components/Login'
import SearchResult from './components/SearchResult'
import WatchList from './components/WatchList'
import Register from './components/Register'
import loginService from './services/login'
import registerService from './services/users'


const App = () => {
 
  const [ user, setUser ] = useState(null)
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const [ success, setSuccess ] = useState(false)
  const [ searchError, setSearchError ] = useState(false)
  const [ productName, setProductName ] = useState('')
  const [ productPrice, setProductPrice ] = useState('')
  const [ productImg, setProductImg ] = useState('')
  const history = useHistory()

 
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedPriceWatcherUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedPriceWatcherUser')
    history.push('/')
    history.go(0)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value) 
  }

  const handleFocus = (event) => {
    event.target.select()
  }

  const search = (event) => {
    event.preventDefault()
    history.push('/')
    axios.get(`/scrape/${encodeURIComponent(searchTerm)}`)
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
        setSearchError(true)
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
    else {return null}
  }

  const SearchErrorAlert = () => {
    if (searchError) {
      return (
        <div className="error">
         <Alert variant="danger">There was an error. Try searching again.</Alert>
       </div>
     )
    } 
    else {return null}
  }

  return (
    <div>
      <Navbar id="navbar" bg="dark" variant="dark" expand="lg">
        <Navbar.Brand className="ml4">PriceWatcher <img id="logo" src="piggy-bank-512.png" width="40px" height="40px" alt=""></img> </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">

          {user === null && 
          <>
            <Nav.Link as={Link} to="/" className="link">Home</Nav.Link>
            <Nav.Link as={Link} to="/login" className="link">Login</Nav.Link>
          </>
          }
          {user !== null &&
          <>
            <Navbar.Brand id="userEmail">{user.email}</Navbar.Brand>
            <Nav.Link as={Link} to="/" className="link">Home</Nav.Link>
            <Nav.Link as={Link} to="/" onClick={handleLogout} className="link">Logout</Nav.Link>
          </>
          }
          <Nav.Link as={Link} to="/watchlist" className="link">Watchlist</Nav.Link>
        </Nav>
        <Form onSubmit={search} inline>
          <FormControl className="mr-sm-2" id="productInput" type="url" value={searchTerm} onChange={handleSearchChange} onFocus={handleFocus} placeholder="https://www.example.com/product_page"/>
          <Button variant="outline-info" type="submit">Search</Button>
        </Form>
        </Navbar.Collapse>
      </Navbar>

      <SearchErrorAlert/>
 
      {user === null && 
        <Switch>
          <Route path="/login">
            <Login loginService={loginService} setUser={setUser} />
          </Route>
          <Route path="/register">
            <Register authenticated={false} registerService={registerService} setUser={setUser} />
          </Route>
          <Route path="/watchlist">
            <WatchList authenticated={false} />
          </Route>
          <Route path="/">
            <LoadingSpinner/>
            <SearchResult product={{name: productName, price: productPrice, img: productImg }} success={success} /> 
            <Home />
          </Route>  
        </Switch>
      }
      {user !== null && 
        <Switch>
          <Route path="/login">
            <Redirect to="/" />
          </Route>
          <Route path="/register">
            <Register authenticated={true} />
          </Route>
          <Route path="/watchlist">
            <WatchList authenticated={true} />
          </Route>
          <Route path="/">
            <LoadingSpinner/>
            <SearchResult product={{name: productName, price: productPrice, img: productImg }} success={success} /> 
            <Home />
          </Route>
        </Switch>   
      }
    </div>
  )
}

export default App;