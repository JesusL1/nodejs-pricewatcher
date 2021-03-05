const SearchResult = ({product}) => {
    return (
        <div>
            <h3>{product.name}</h3>
            <h3>${product.price}</h3>
            <img src={product.img} alt='' width='430rem' height='430rem' />
        </div>
    )
}

export default SearchResult;