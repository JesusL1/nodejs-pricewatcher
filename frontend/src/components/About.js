import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const About = () => {
    return (
        <div id="about">
            <div className="info">
                <h1>What is PriceWatcher?</h1>
                <p>PriceWatcher is a web service that allows users to easily add a product to a watchlist and receive
                    an email notification when the product's price is discounted.</p>
                <p> View my <a href="https://github.com/JesusL1/nodejs-pricewatcher" target="_blank" rel="noreferrer">Code</a> at GitHub.com </p>
                <Button as={Link} to="/register" variant="success">Create Account</Button>
            </div>
            <div className="info">
                <h1> How It Works </h1>
                <ol type="1">
                    <li> View the list of supported Websites before searching a product. </li>
                    <li> Copy and paste the URL of the product page into the search bar above. </li>
                    <li> Click the "Save Product" button and enter the watch price. </li>
                    <li> Wait for a product discount and receive an email alert! </li>
                </ol> 
            </div>
            <div className="info">
                <h1> Supported Websites </h1>
                <ul>
                    <li> <a href="https://93brand.com/" target="_blank" rel="noreferrer">93brand</a> </li>
                    <li> <a href="https://www.adidas.com/us" target="_blank" rel="noreferrer">Adidas</a> </li>
                    <li> <a href="https://www.microcenter.com/" target="_blank" rel="noreferrer">Microcenter</a> </li>
                </ul>  
            </div>
        </div>
    )
}

export default About;