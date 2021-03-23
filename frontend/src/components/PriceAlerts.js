
const PriceAlerts = ({authenticated}) => {
    if (authenticated) {
        return (
            <div>
                PriceAlerts Page for logged in users
            </div>
        )
    }
    else {
        return (
            <div>
                Must have an account to setup Price Alerts.
            </div>
        )
    }
        
}

export default PriceAlerts;