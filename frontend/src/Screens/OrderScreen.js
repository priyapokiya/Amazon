import { useEffect, useState } from "react"
import CheckoutSteps from "../Components/CheckoutSteps"
import Loader from "../Components/Loader"
import Messagebox from "../Components/Messagebox"
import apiHelper from "../Components/ApiHelper"
import { useLocation, useNavigate } from "react-router-dom"
import handlePayment from "../Components/LoadRazorpay"

export default function OrderScreen(props) {

    const location = useLocation()
    const [cart, setCart] = useState([])
    const [error, setError] = useState("")
    const [isLoading, setisLoading] = useState(false)
    let { cartItems, setcartItems } = props
    const [summarydetails, setsummarydetails] = useState({
        totalAmount: 0,
        totalItems: 0,
        totalProducts: 0,
        delivery: 0,
        text: 0
    })

    const navigate = useNavigate()

    const redirect = location.search.split("?redirect=")[1]

    let ShippingInfo = JSON.parse(localStorage.getItem("userInfo") || "{}")
    ShippingInfo = ShippingInfo.Address

    useEffect(() => {
        cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]")
        setcartItems(cartItems)
    }, [])

    const getCart = async () => {
        try {

                setisLoading(true)
                const products = cartItems.map((x) => x.products)
                // setisLoading(false)
                const result = await apiHelper.fetchCart(products)
                // setisLoading(true)
                const product = result?.data?.products

                for (let i in product) {
                    for (let j in cartItems) {
                        if (cartItems[j].products === product[i]._id) {
                            product[i].qty = cartItems[j].qty
                        }
                    }
                }
                setCart(product);
                setisLoading(false)
                // console.log(cart);
            } catch (error) {
                    setisLoading(false)
                    if (error.response && error.response.data && error.response.data.message) {
                        setError(error.response.data.message)
                        return
                    }
                    setError(error.message)
        }
    }

    useEffect(() => {
        getCart()
    }, [cartItems])


    useEffect(() => {
        let i = 0;
        let totalprice = 0
        let totalItems = 0
        let totalProducts = 0

        while (i < cart.length) {
            if (cart[i].countInstock > 0) {
                totalItems += cart[i].qty
                totalprice += (cart[i].qty * cart[i].price)
                totalProducts++
            }
            i++
        }

    setsummarydetails({
        ...summarydetails, totalItems: totalItems, totalAmount: totalprice, totalProducts: totalProducts
        })
    }, [cart])


    const PlaceOrderHandle = async () =>{
        try {
            const userInfo = JSON.parse(localStorage.getItem("userInfo") || "[]")

            const paymentMethod = redirect && redirect === "online" ? "online" : "cod"

            const products = cart.map(({_id , qty, price}) => ({_id, qty, price}))

            const OrderDetails = {
                userInfo:userInfo,
                paymentMethod:paymentMethod,
                products:products,
                shippingAddress:userInfo.Address,
                totalPrice: summarydetails.totalAmount
            }

            const result = await apiHelper.PlaceOrder(OrderDetails)
            // localStorage.removeItem("cartItems")
            // setcartItems([])
            console.log(result);
            if(!result.data.order.RazorpayDetails){
                return navigate("/order" + result.data.order._id)
            }else{
                const data = result.data.order
                const Options = {
                    name:data.shippingAddress.fullName,
                    phone:data.shippingAddress.Phone,
                    Address:data.shippingAddress.Address,
                    apikey:data.RazorpayDetails.apikey,
                    amount:data.RazorpayDetails.amount,
                    currency:data.RazorpayDetails.currency,
                    razorpayOrderid:data.RazorpayDetails.id,
                    orderId:data._id,
                    setError:setError,
                    navigate:navigate
                }
                handlePayment(Options)
            }

        } catch (error) {
            if(error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message)
                return
            }
            setError(error.message)
        }
    }


    return (
        <>
         <br/>
            <CheckoutSteps signin={true} shipping={true} payment={true} placeorder={true} />
            <Loader isLoading={isLoading} />
            <Messagebox error={error} seterror={setError} />
            <section className="h-100 gradient-custom">
                <div className="container py-4">
                    <div className="row d-flex justify-content-center my-4">
                        <div className="col-md-8">
                            <div className="mb-4 shadow">

                                <div className="card-header py-3 ">
                                    <h5 className="mb-0">Review Your Order</h5>
                                </div>

                                <div className="card-body">
                                    <div className="row">
                                        <div className="col  mb-lg-0">
                                            <h5>Shipping Imformation</h5>

                                            <div className="address d-flex mb-0 mt-4 mb-0">
                                                <h6>FullName :</h6>
                                                <p className="ms-3">{ShippingInfo.fullName}</p>
                                            </div>

                                            <div className="address d-flex " style={{ marginTop: "-10px", marginBottom: "-20px" }}>
                                                <h6>Address :</h6>
                                                <p className="ms-3">{ShippingInfo.Address}</p>
                                            </div>

                                            <div className="address d-flex  mb-0 mt-2 mb-0" style={{ marginTop: "-10px", marginBottom: "-20px" }}>
                                                <h6>Phone No :</h6>
                                                <p className="ms-3">{ShippingInfo.Phone}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <hr className="my-4" />
                                    <div className="row">
                                        <div className="col  mb-lg-0">
                                            <h5>Payment Imformation</h5>

                                            <div className="address d-flex mb-0 mt-4 mb-0 align-items-center">
                                                <h6 className="p-0 m-0">Payment Method:</h6>
                                                <p className="ms-3 fw-bold text-danger p-0 m-0">{redirect && redirect === "cod" ? "cod" : "online"}</p>
                                            </div>
                                        </div>
                                    </div>


                                    <hr className="my-4 " />

                                    <h5 className="mb-4">Order Imformation</h5>
                                    {

                                        cart.map((x) => {
                                            return (
                                                <section className="h-100" style={{ backgroundColor: "#eee" }}>
                                                    <div className="container py-3 h-100">
                                                        <div className="row d-flex justify-content-center align-items-center h-100">

                                                            <div className="shadow">
                                                                <div className="card-body p-4">
                                                                    <div className="row">
                                                                        <div className="col-6 d-flex flex-row align-items-center text-center  justify-content-between">
                                                                            <div>
                                                                            <img src={x.image} className="px-0" alt="Shopping item"/>
                                                                            </div>

                                                                            <div className="ms-5">
                                                                                <h5 className="mb-3">Name</h5>
                                                                                <h5>{x.name}</h5>
                                                                            </div>

                                                                            <div className="ms-5">
                                                                                <h5 className="mb-3">Quantity</h5>
                                                                                <h5>{x.qty}</h5>
                                                                            </div>

                                                                            <div className="ms-5 px-4">
                                                                                <h5 className="mb-3">Price</h5>
                                                                                <h5>${x.price}</h5>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </section>

                                            )
                                        })

                                    }


                                    <hr className="my-4" />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="mb-4 shadow">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">Order Summary</h5>
                                </div>

                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                           Total Items
                                            <span>{summarydetails.totalItems}</span>
                                        </li>

                                        <li className="list-group-item d-flex justify-content-between align-items-center border-0  px-0">
                                            Delivery
                                            <span>{summarydetails.delivery}</span>
                                        </li>

                                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 ">
                                            Total Amount
                                            <span>${summarydetails.totalAmount}</span>
                                        </li>

                                        <li className="list-group-item d-flex justify-content-between align-items-center px-0 mb-3">
                                            Discount
                                            <span>$3.98</span>
                                        </li>

                                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                            <div><strong>Order Total </strong></div>
                                            <span><strong>${summarydetails.totalAmount}</strong></span>
                                        </li>
                                    </ul>

                                    <div className="button justify-content-center ">
                                        <button type="button " onClick={PlaceOrderHandle} className="btn btn-warning btn-lg w-100" >Place your order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}