import { Button } from 'react-bootstrap'

const SearchResult = ({product, success}) => {

    const handleAdd = (event) => {
        event.preventDefault()
    }

    if (success) {
        return (
            <div>
                <div id="product">
                    <img src={product.img} alt='' width='230rem' height='230rem' />
                    <p className="name">{product.name}</p>
                    <p className="price">${product.price}</p>
                    <Button className="addButton">Add to Price Alerts</Button>
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