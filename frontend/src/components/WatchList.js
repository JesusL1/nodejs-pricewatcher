
const WatchList = ({authenticated}) => {
    if (authenticated) {
        return (
            <div>
                Watchlist Page for logged in users
            </div>
        )
    }
    else {
        return (
            <div>
                Must have an account to save products to watchlist.
            </div>
        )
    }
        
}

export default WatchList;