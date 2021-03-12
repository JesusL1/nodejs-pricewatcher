const SearchResult = ({product, success}) => {
    if (success) {
        return (
            <div>
                <div id="product">
                    <img src={product.img} alt='' width='230rem' height='230rem' />
                    <p className="name">{product.name}</p>
                    <p className="price">${product.price}</p>
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