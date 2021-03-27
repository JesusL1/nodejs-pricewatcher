import React from 'react'
import { Button, Table } from 'react-bootstrap'

const PriceAlerts = ({authorized, priceAlerts, handleDelete}) => {

    if (authorized) {
        return (
            <div>
                <Table bordered id="priceAlerts">
                    <thead className="thead-light">
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                {priceAlerts.map((pAlert, index) => {
                    return (
                    <tr key={pAlert.id}>
                        <td>{index+1}</td>
                        <td><div className="productColumn">
                                <img src={pAlert.productImg} alt='' width='110rem' height='110rem'/> 
                            </div>
                            <div className="pAlertName">
                                    <a href={pAlert.productURL}>{pAlert.productName}</a>
                            </div>
                        </td>
                        <td className="priceColumn">${pAlert.productPrice}</td>
                        <td><Button variant="danger" onClick={() => handleDelete(pAlert)}>Delete</Button></td>
                    </tr> 
                    )
                })}
                </tbody>
                </Table>
            </div>
        )
    }
    else {
        return null
    }
        
}

export default PriceAlerts;