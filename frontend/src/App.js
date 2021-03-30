import React, { useState, useEffect } from 'react'
import { Switch, Route, Link, Redirect, useHistory } from 'react-router-dom'
import { Alert, Button, Form, FormControl, Nav, Navbar, Spinner } from 'react-bootstrap'
import axios from 'axios'
import Home from './components/Home'
import Login from './components/Login'
import SearchResult from './components/SearchResult'
import PriceAlerts from './components/PriceAlerts'
import Register from './components/Register'
import loginService from './services/login'
import registerService from './services/users'
import priceAlertsService from './services/price-alerts'


const App = () => {
 
  const [ authorized, setAuthorized ] = useState(false)
  const [ user, setUser ] = useState(null)
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const [ success, setSuccess ] = useState(false)
  const [ searchError, setSearchError ] = useState(false)
  const [ productURL, setProductURL ] = useState('')
  const [ productName, setProductName ] = useState('')
  const [ productPrice, setProductPrice ] = useState('')
  const [ productImg, setProductImg ] = useState('')
  const [ priceAlerts, setPriceAlerts ] = useState([]) 
  const history = useHistory()

 
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedPriceWatcherUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setAuthorized(true)
      priceAlertsService.setToken(user.token)
      priceAlertsService.getAll().then(pAlerts => 
        setPriceAlerts(pAlerts)
      )
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
          if (p.url.length>1 && p.name.length>1 && p.price && p.img.length>1 ) {
            setProductURL(p.url)
            setProductName(p.name)
            setProductPrice(p.price)
            setProductImg(p.img)
            setSuccess(true)
            setSearchTerm('')
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

  const handleDelete = (pAlert) => {
    priceAlertsService.remove(pAlert.productURL)
    .then(() => {
        setPriceAlerts(priceAlerts.filter(item => item.productURL !== pAlert.productURL))
    })
    .catch(error => {
      console.log(error)
    })
  }

  const LoadingSpinner = () => {
    if (loading) {
      return (
        <Spinner id="spinner" className="margin-t" animation="border" variant="dark" size="lg" />
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
          <Nav.Link as={Link} to="/price-alerts" className="link">Price Alerts</Nav.Link>
        </Nav>
        <Form onSubmit={search} inline>
          <FormControl className="mr-sm-2" id="productInput" type="url" value={searchTerm} onChange={handleSearchChange} onFocus={handleFocus} placeholder="Enter Product URL"/>
          <Button variant="outline-info" type="submit">Search</Button>
        </Form>
        </Navbar.Collapse>
      </Navbar>

      <SearchErrorAlert/>
 
      {user === null && 
        <Switch>
          <Route path="/login">
            <Login loginService={loginService} priceAlertsService={priceAlertsService} setUser={setUser} />
          </Route>
          <Route path="/register">
            <Register authorized={authorized}  loginService={loginService} registerService={registerService} 
              priceAlertsService={priceAlertsService} setUser={setUser} />
          </Route>
          <Route path="/price-alerts">
            <PriceAlerts authorized={authorized} />
            <Alert variant="warning" className="alert">You must be logged in to add products to price alerts.</Alert>
          </Route>
          <Route path="/">
            <LoadingSpinner/>
            <SearchResult user={user} 
              product={{url: productURL, name: productName, price: productPrice, img: productImg }} success={success} /> 
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
            <Register authorized={authorized} />
          </Route>
          <Route path="/price-alerts">
            <PriceAlerts authorized={authorized} priceAlerts={priceAlerts} handleDelete={handleDelete} />
          </Route>
          <Route path="/">
            <LoadingSpinner/>
            <SearchResult user={user} priceAlertsService={priceAlertsService} priceAlerts={priceAlerts} 
              setPriceAlerts={setPriceAlerts} product={{url: productURL, name: productName, price: productPrice, img: productImg }} success={success} /> 
            <Home />
          </Route>
        </Switch>   
      }
    </div>
  )
}

export default App;