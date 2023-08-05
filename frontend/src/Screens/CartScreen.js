// import './App.css';

import { useEffect, useState } from "react"
import apiHelper from "../Components/ApiHelper"
import Loader from "../Components/Loader"
import Messagebox from "../Components/Messagebox"
import { Link, useNavigate } from "react-router-dom"

export default function CartScreen(props) {
  let { setcartItems, cartItems } = props

  const navigate = useNavigate()

  // let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]")
  const [cart, setCart] = useState([])
  const [error, setError] = useState("")
  const [isLoading, setisLoading] = useState(false)
  const [summarydetails, setsummarydetails] = useState({
    totalAmount: 0,
    totalItems: 0,
    totalProducts: 0,
    delivery: 0,
    text: 0
  })

  useEffect(() => {
    let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]")
    setcartItems(cartItems)
  }, [])


  const getCart = async () => {
    try {

      setisLoading(true)
      const products = cartItems.map((x) => x.products)
      console.log(products);
      // setisLoading(false)
      const result = await apiHelper.fetchCart(products)
      // setisLoading(true)
      console.log(result);
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

 
  const RemoveHandler = (id) => {
    console.log(id);
    cartItems = cartItems.filter((x) => x.products !== id)
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
    setcartItems(cartItems)
    getCart()
  }

  const CheckoutHandler = () => {
    const token = localStorage.getItem("token")
    if(!token){
      navigate("/login?redirect=shipping")
    }
    else{
      navigate("/shipping?redirect=payment")
    }
  }
  // console.log(cart);

  return (
    <>
      <Loader isLoading={isLoading} />
      <Messagebox error={error} seterror={setError} />
      <div className="card1">
        <div className="row">
          <div className="col-md-8 cart">
            <div className="title">
              <div className="row">
                <div className="col">
                  <h4>
                    <b>Shopping Cart</b>
                  </h4>
                </div>
                <div className="col align-self-center text-right text-muted">
                  {summarydetails.totalProducts} &nbsp;Product
                </div>
              </div>
            </div>
            {cart.length <= 0 ? (
              <h5 className="text-danger-center">cart is empty</h5>
            ) : (
              cart && cart.map((x, index) => {
                return <div className="row border-top border-bottom" key={x._id}>
                  <div className="row main align-items-center">
                    <div className="col-2">
                      <img className="img-fluid" src={x.image} />
                    </div>
                    <div className="col">
                      <div className="row text-muted">{x.brand}</div>
                      <div className="row">{x.name}</div>
                    </div>



                    {/* <div className="col">
                    <a href="#">-</a>
                    <a href="#" className="border">
                      1
                    </a>
                    <a href="#">+</a>
                  </div> */}


                    <div className="col">

                      <select value={x.qty} onChange={(e) => {
                        cart[index].qty = Number(e.target.value)
                        setCart([...cart])

                        let tmp = cart.map((x) => {
                          return {
                            products: x._id,
                            qty: x.qty
                          }
                        })

                        localStorage.setItem("cartItems", JSON.stringify(tmp))

                      }}>
                        {

                          [...new Array(x.countInstock).keys()].map((n) => (
                            <option value={n + 1} key={n + 1}>{n + 1}</option>
                          )
                          )

                        }
                      </select>
                    </div>



                    <div className="col">
                      $ {x.qty * x.price} <span className="close"></span>
                    </div>

                    <div className="col">
                      <button type="button"  onClick={()=>RemoveHandler(x._id)} className="btn btn-danger">Remove</button>
                    </div>
                  </div>
                </div>



              })
            )
            }
            {/* <div className="row">
              <div className="row main align-items-center">
                <div className="col-2">
                  <img className="img-fluid" src="https://i.imgur.com/ba3tvGm.jpg" />
                </div>
                <div className="col">
                  <div className="row text-muted">Shirt</div>
                  <div className="row">Cotton T-shirt</div>
                </div>
                <div className="col">
                  <a href="#">-</a>
                  <a href="#" className="border">
                    1
                  </a>
                  <a href="#">+</a>
                </div>
                <div className="col">
                  € 44.00 <span className="close">✕</span>
                </div>
              </div>
            </div>
            <div className="row border-top border-bottom">
              <div className="row main align-items-center">
                <div className="col-2">
                  <img className="img-fluid" src="https://i.imgur.com/pHQ3xT3.jpg" />
                </div>
                <div className="col">
                  <div className="row text-muted">Shirt</div>
                  <div className="row">Cotton T-shirt</div>
                </div>
                <div className="col">
                  <a href="#">-</a>
                  <a href="#" className="border">
                    1
                  </a>
                  <a href="#">+</a>
                </div>
                <div className="col">
                  € 44.00 <span className="close">✕</span>
                </div>
              </div>
            </div> */}
            <div className="back-to-shop">
              <a href="#">←</a>
              {/* <span className="text-muted">Back to shop</span> */}
              <Link to=".." className="link" style={{ fontWeight: "600" }}>Back to Shop</Link>
            </div>
          </div>
          <div className="col-md-4 summary">
            <div>
              <h5>
                <b>Summary</b>
              </h5>
            </div>
            <hr />
            <div className="row">
              <div className="col" style={{ paddingLeft: 0 }}>
                Total Product
              </div>
              <div className="col text-right">{summarydetails.totalProducts}&nbsp; Products</div>
            </div>
            <br />
            <div className="row">
              <div className="col" style={{ paddingLeft: 0 }}>
                Total Items
              </div>
              <div className="col text-right">{summarydetails.totalItems}&nbsp; Items</div>
            </div>

            <div
              className="row"
              style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}
            >
              <div className="col"><b>Total Price</b></div>
              <div className="col text-right"><b>${summarydetails.totalAmount}</b></div>
            </div>
            <button onClick={CheckoutHandler} className="btn2">CHECKOUT</button>
            <form>


              <p>GIVE CODE</p>
              <input id="code" placeholder="Enter your code" />
            </form>
          </div>
        </div>
      </div>

    </>

  )
}