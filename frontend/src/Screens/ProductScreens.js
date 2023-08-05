import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import apiHelper from "../Components/ApiHelper"
import Rating from "../Components/Rating"
import Loader from "../Components/Loader"
import Messagebox from "../Components/Messagebox"





const ProducctScreens = ({ setappState , setcartItems , cartItems }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState({})
    const [isLoading, setisLoading] = useState(false)
    const [error, setError] = useState("")
    const [qty, setqty] = useState(1)
    
    
    const getProduct = async () => {
        try {
            setisLoading(true)
            const result = await apiHelper.fetchProductById(id)

            if (result.status === 200) {
                setProduct(result.data.product);
            }
            setisLoading(false)
        } catch (error) {
            setisLoading(false)
            if (error.response && error.response.data) {
                return setError(error.response.data.message)
            }
            setError(error.message)
        }
    }
    useEffect(() => {
        getProduct()
        setappState({ cartSize: cartItems.length })
        // eslint-disable-next-line 
    }, [])

    useEffect(() => {
        setqty(product.countInstock && product.countInstock > 0 ? 1 : 0)
    }, [product])


    const AddToCart = async () => {


        try {
            const cartItems = await JSON.parse(localStorage.getItem("cartItems") || "[]")

            const cart = {
                products: id,
                qty: qty
            }
            // cartItems.push(cart)
            const findIndex = cartItems.findIndex((x) => x.products === id)
            if (findIndex > -1) {
                cartItems[findIndex].qty = qty
            } else {
                cartItems.push(cart)
            }
            localStorage.setItem("cartItems", JSON.stringify(cartItems))
            setcartItems(cartItems)
            setappState({ cartSize: cartItems.length })
            navigate("/cart")
        } catch (error) {

        }

    }




    return (
        <div className="px-3" style={{ position: "relative" }}>
            <Loader isLoading={isLoading} />
            <Messagebox error={error} seterror={setError} />
            <Link to=".." className="link" style={{ fontWeight: "600" }}>Back to Home</Link>

            <div className="container">
                <div className="row">

                    <div className="col-12 col-md-3 mb-3">
                        <img src={product.image} alt="" className="border border-dark w-100 mt-3" height={"380px"} />
                        <img src={product.image1} alt="" className="border border-dark w-100 mt-3" height={"380px"} />
                    </div>

                    <div className="col-12 col-md-3 mb-3">
                        <img src={product.image2} alt="" className="border border-dark w-100 mt-3" height={"380px"} />
                        <img src={product.image3} alt="" className="border border-dark w-100 mt-3" height={"380px"} />
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="pdetail  w-100  w-100 mt-4 h-75">
                            <h2 className="fw-normal text-center mt-5">Adidas Shirt & Pent</h2>
                            <h6 className="link text-center mt-3">{product.name}</h6>

                            <div className="d-flex gap-2 mt-4 justify-content-center text-warning">
                                <Rating rating={product.rating} />
                                <span className="text-dark">
                                    {product.numReviews} reviews
                                </span>
                            </div>

                            <div className="fw-normal mt-4 text-center">
                                <h5>Price : ${product.price}</h5>
                            </div>

                            <div className=" mt-4 text-center">
                                <h4 className="fs-6 ">Description : {product.brand}</h4>
                            </div>

                            <div className="fw:normal mt-4 d-flex justify-content-center">
                                <h3 className="fs-5">Quantity : &nbsp; </h3>

                                <div className="d-flex align-items-center justify-content-center h-25">

                                    <select onChange={(e) => setqty(Number(e.target.value))} value={qty} disabled={product.countInstock <= 0}>
                                        {
                                            [...new Array(product.countInstock).keys()].map((x) => {
                                                return <option key={x} value={x + 1}> {x + 1} </option>
                                            })
                                        }
                                    </select>
                                    {/* <select disabled={product.countInstock <= 0}>
                                        {
                                            [...new Array(product.countInstock).keys()].map((x) => {
                                                return <option value={x + 1} key={x + 1}>{x + 1}</option>
                                            })
                                        }
                                    </select> */}
                                </div>

                                {/* <div className="d-flex align-items-center justify-content-center">
                    <button disabled ={qty <= 1 } className="btn fw-bold">-</button>
                    <span className="btn fw-bold">
                        10
                    </span>
                    <button disabled ={qty >= product.co } className="btn fw-bold">+</button>
                </div> */}
                            </div>

                            <div className="mt-4 d-flex justify-content-center">
                                <h5 className="fs-5 fw-normal">Status : </h5>
                                <h5 className={product.countInstock > 0 ? "text-success" : "text-danger"}>{product.countInstock > 0 ? "In stock" : "Out of Stock"}</h5>
                            </div>

                            <center> <button disabled={qty <= 0} onClick={AddToCart} className="btn1 mt-4 w-25 rounded-3 p-2">Add to Cart</button></center>
                            <center><button className="btnb mt-4 w-25 p-2 rounded-3">Buy Now!</button></center>

                        </div>


                    </div>
                </div>
            </div>
        </div>

    )

}

export default ProducctScreens;



