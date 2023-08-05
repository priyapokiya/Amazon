import { useState } from "react";
import Input from "../Components/Input";
import Validation from "../Components/validation";
import CheckoutSteps from "../Components/CheckoutSteps";
import Loader from "../Components/Loader";
import Messagebox from "../Components/Messagebox";
import { useLocation, useNavigate } from "react-router-dom";


export default function ShippingScreen(){

    const navigate = useNavigate()
    const location = useLocation()

    const [shippingError,setshippingError] = useState([])
    const [isSubmited,setisSubmited] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    const [error, setError] = useState("")
    const [address,setaddress] = useState({
        fullName:"",
        Phone:"",
        Address:"",
        City:"",
        State:"",
        Pincode:""
    })

    const redirect = location.search.split("?redirect=")[1]

    const ShippingHandler = () => {

        try {
            
            setisSubmited(true)

            const validationResult = Validation(address , "shipping")
            console.log(validationResult);

            if(validationResult.length > 0){
                setshippingError(validationResult)
                return
            }
            
            setisLoading(true)

            const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}")
            userInfo.Address = address
            localStorage.setItem("userInfo",JSON.stringify(userInfo))

            setisLoading(false)

            if(!redirect){
                navigate("/cart")
            } else {
                navigate( `/${redirect}`)
            }

            // navigate("/payment?redirect=placeorder")

        } catch (error) {
            if(error.response && error.response.data){
                if(error.response && error.response.data) {
                    if(error.response.status === 400 && error.response.data && error.response.data.message === "validation Error") {
                        setshippingError(error.response.data.validationResult)
                        return
                    }
                    setError(error.response.data.message)
                    setisLoading(false)
                } else {
                    setError(error.response)
                }
            }
        }
    }

    return(
        <>
        <div className="container py-4">
            <CheckoutSteps signin = {true} shipping = {true} />
            <Loader isLoading={isLoading} />
            <Messagebox error={error} seterror={setError} />
                <div className="text-center pt-4">
                    <h4>Shipping Address</h4><br/>
                </div>
            <div className="row">


                
                <div className="col-12 d-flex justify-content-center">
                <div className="w-50">
                    <h6>Fullname</h6>
                    <Input  className="w-75 border rounded-1" type="text" id="fullname" placeholder="Fullname"
                    isError = {shippingError.find((x) => x.key === "fullName" ) ? true : false}// eslint-disable-next-line
                    helperText={shippingError.find((x) => x.key === "fullName") ?.message}
                    value = {address.fullName}
                    onChange={(e) => {
                        setaddress({...address , fullName:e.target.value})

                    if( isSubmited) {
                        const validationResult = Validation({...address , fullName:e.target.value}, "shipping")

                        setshippingError(validationResult)
                    }
                    }}
                    
                    />

                    </div>  
                </div>


                <div className="col-12 d-flex justify-content-center">
                <div className="w-50">
                    <h6>Phone</h6>
                    <Input  className="w-75 border rounded-1" type="text" id="phone" placeholder="Phone"
                    isError = {shippingError.find((x) => x.key === "Phone" ) ? true : false}// eslint-disable-next-line
                    helperText={shippingError.find((x) => x.key === "Phone") ?.message}
                    value = {address.Phone}
                    onChange={(e) => {
                        setaddress({...address , Phone:e.target.value})

                    if( isSubmited) {
                        const validationResult = Validation({...address , Phone:e.target.value}, "shipping")

                        setshippingError(validationResult)
                    }
                    }}
                    
                    />

                    </div>  
                </div>


                <div className="col-12 d-flex justify-content-center">
                <div className="w-50">
                    <h6>Address</h6>
                    <Input  className="w-75 border rounded-1" type="text" id="address" placeholder="Address"
                    isError = {shippingError.find((x) => x.key === "Address" ) ? true : false}// eslint-disable-next-line
                    helperText={shippingError.find((x) => x.key === "Address") ?.message}
                    value = {address.Address}
                    onChange={(e) => {
                        setaddress({...address , Address:e.target.value})

                    if( isSubmited) {
                        const validationResult = Validation({...address , Address:e.target.value}, "shipping")

                        setshippingError(validationResult)
                    }
                    }}
                    
                    />

                    </div>  
                </div>


                <div className="col-12 d-flex justify-content-center">
                <div className="w-50">
                    <h6>City</h6>
                    <Input  className="w-75 border rounded-1" type="text" id="City" placeholder="City"
                    isError = {shippingError.find((x) => x.key === "City" ) ? true : false}// eslint-disable-next-line
                    helperText={shippingError.find((x) => x.key === "City") ?.message}
                    value = {address.City}
                    onChange={(e) => {
                        setaddress({...address , City:e.target.value})

                    if( isSubmited) {
                        const validationResult = Validation({...address , City:e.target.value}, "shipping")

                        setshippingError(validationResult)
                    }
                    }}
                    />
                    </div>  
                </div>


                <div className="col-12 d-flex justify-content-center">
                <div className="w-50">
                    <h6>State</h6>
                    <Input  className="w-75 border rounded-1" type="text" id="State" placeholder="State"
                    isError = {shippingError.find((x) => x.key === "State" ) ? true : false}// eslint-disable-next-line
                    helperText={shippingError.find((x) => x.key === "State") ?.message}
                    value = {address.State}
                    onChange={(e) => {
                        setaddress({...address , State:e.target.value})

                    if( isSubmited) {
                        const validationResult = Validation({...address , State:e.target.value}, "shipping")

                        setshippingError(validationResult)
                    }
                    }}
                    />
                    </div>  
                </div>


                <div className="col-12 d-flex justify-content-center">
                <div className="w-50">
                    <h6>Pincode</h6>
                    <Input  className="w-75 border rounded-1" type="text" id="Pincode" placeholder="Pincode"
                    isError = {shippingError.find((x) => x.key === "Pincode" ) ? true : false}// eslint-disable-next-line
                    helperText={shippingError.find((x) => x.key === "Pincode") ?.message}
                    value = {address.Pincode}
                    onChange={(e) => {
                        setaddress({...address , Pincode:e.target.value})

                    if( isSubmited) {
                        const validationResult = Validation({...address , Pincode:e.target.value}, "shipping")

                        setshippingError(validationResult)
                    }
                    }}
                    />
                    </div>  
                </div>

                <div className="col-12 d-flex justify-content-center">
                <div className="w-50">
                      <div className="btn btn-primary w-25" onClick={ShippingHandler}>Continue</div>
                </div>
                
            </div>
     
        </div>
        </div>
        </>
    )

}