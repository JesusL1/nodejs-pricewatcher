import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const SearchResult = ({user, priceAlertsService, product, success, priceAlerts, setPriceAlerts}) => {

    const history = useHistory()

    const handleAdd = (event) => {
        event.preventDefault()
        if (user) {
            history.push('/price-alerts')
            const priceAlert = {
                user_email: user.email,
                productURL: product.url,
                productName: product.name,
                productPrice: product.price,
                productImg: product.img
            }
            priceAlertsService.create(priceAlert)
                .then((pAlert) => {
                    setPriceAlerts(priceAlerts.concat(pAlert))
                })
                .catch(error => {
                    console.log(error)
                })
        }
        else {
            alert('You need to be signed in to use Price Alerts.')
        }
    }

    if (success) {
        return (
            <div className="margin-t">
                <div id="product">
                    <img src={product.img} alt='' width='230rem' height='230rem' />
                    <p className="name">{product.name}</p>
                    <p className="price">${product.price}</p>
                    <Button onClick={handleAdd} className="addButton">Add to Price Alerts</Button>
                </div>
                <hr></hr>
            </div>
        )
    }
    else {
        return null
    }
   
}

export default SearchResult;