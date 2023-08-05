import { useState } from "react"
import { useNavigate } from "react-router-dom"
import CheckoutSteps from "../Components/CheckoutSteps"
import Loader from "../Components/Loader"
import Messagebox from "../Components/Messagebox"

export default function Payment() {

    const navigate = useNavigate()
    const [isLoading, setisLoading] = useState(false)
    const [error, setError] = useState("")
    const [paymentMethod , setpaymentMethod] = useState("online")


    const CheckoutHandler = () =>{
        if(paymentMethod === "online"){
            navigate("/order?redirect=online")
        }else if(paymentMethod === "cod"){
            navigate("/order?redirect=cod")
        }
    }

    const HandelPaymentSelection = (e) =>{
        setpaymentMethod(e.target.value)
    }


    
    return (
        <>
        <br/>
           <CheckoutSteps signin = {true} shipping = {true} payment = {true} />
            <Loader isLoading={isLoading} setisLoading={setisLoading} />
            <Messagebox error={error} seterror={setError} />
            <h2 className="pt-3 text-center">Payment Method</h2>
            <div className="div  d-flex justify-content-center ">
                <div className="main shadow-lg  w-25 mt-5 border border-gray " style={{ height: "300px" }}>
                    <center>
                        <div className="box-1 d-flex justify-content-start px-5 border border-dark w-50 p-1 mt-5" style={{ height: "50px" }}>
                            <div className="d-flex ">
                                <div>
                                    <input type="radio" className="mt-3 border border-dark" value={"online"} checked={paymentMethod === "online"} onChange={HandelPaymentSelection}/>
                                </div>
                                <div className="mt-2 px-2">
                                    <span className="fw-bold">Online</span>
                                </div>
                            </div>
                        </div>


                        <div className="box-2 px-5 border border-dark w-50 p-1 mt-4" style={{ height: "50px" }}>
                            <div className="d-flex">
                                <div>
                                    <input type="radio" className="mt-3 border border-dark" value={"cod"} checked={paymentMethod === "cod"} onChange={HandelPaymentSelection} />
                                </div>
                                <div className="mt-2 px-2">
                                    <span className="fw-bold">COD</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 mt-4 d-flex justify-content-center">
                            <div className="w-100">
                                <div className="btn btn-warning w-25" onClick={CheckoutHandler}>Continue</div>
                            </div>
                        </div>
                    </center>
                </div>
            </div>

        </>
    )
}