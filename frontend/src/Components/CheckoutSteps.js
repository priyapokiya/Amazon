export default function CheckoutSteps(props) {

    const { signin, shipping, payment, placeorder } = props

    return (
        <div className="row">
            <div className="col-3 px-0" style={{ paddingTop: "5px", borderTop: signin? " 5px solid orange": "5px solid gray"}}>
                <h5 style={{ color: signin ? "orange" : "gray"}}>Sign in</h5>
            </div>

            <div className="col-3 px-0" style={{ paddingTop: "5px", borderTop: shipping? " 5px solid orange": "5px solid gray"}}>
                <h5 style={{ color: shipping ? "orange" : "gray"}}>Shipping</h5>
            </div>

            <div className="col-3 px-0" style={{ paddingTop: "5px", borderTop: payment? " 5px solid orange": "5px solid gray"}}>
                <h5 style={{ color: payment ? "orange" : "gray"}}>Payment</h5>
            </div>

            <div className="col-3 px-0" style={{ paddingTop: "5px", borderTop: placeorder? " 5px solid orange": "5px solid gray"}}>
                <h5 style={{ color: placeorder ? "orange" : "gray"}}>Place Order</h5>
            </div>
            
        </div>
    )
}