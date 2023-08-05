import { useState } from "react";
import Loader from "../Components/Loader";
import { Link, useNavigate } from "react-router-dom";
import apiHelper from "../Components/ApiHelper";

export default function RegisterUser(){
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [isSubmitted, setisSubmitted] = useState(false)
    const [error, setError] = useState("")
    const [firstName, setfirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const[isLoading,setisLoading] = useState(false)
    const navigate = useNavigate()

    const RegisterHandler = async () =>{

        try {
            setisSubmitted(true)

            // if (firstName.length <= 2) {
            //     return setError("Invalid Firstname");
            //  }
            //  if (lastName.length <= 2) {
            //     return setError("Invalid Lastname");
            //  }
            // if (!Email) {
            //     setError("required field email is empty")
            //     return;
            // }
            // // eslint-disable-next-line
            // if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email))) {
            //     setError("Invalid email")
            //     return
            // }

            // if (!Password) {
            //     setError("required field password is empty")
            //     return;
            // }

            

            setisLoading(true)
            const result = await apiHelper.userRegister({firstName,lastName,email:Email,password:Password})
            localStorage.setItem("userInfo", JSON.stringify(result.data.user))
            localStorage.setItem("token", JSON.stringify(result.data.user.token))
            navigate("/")
            setisLoading(false)
        } catch (error) {
            setisLoading(false)
            if (error && error.response && error.response.data) {
                setError(error.response.data.message)
            }
        }
    }


    return(
        <div className="d-flex login justify-content-center pt-5" style={{ position:"relative" }} >
        <Loader isLoading={isLoading} />
        <div className="card shadow-lg" style={{ width: "25rem" }}>
            <div className="px-4 py-2">
                <h5 className="mb-0">Register</h5>
            </div>
            <div className="card-body bg-light">
                <div className="row">


                    <div className="col-12 mb-2">
                    <input type="text" onChange={(e) => {
                            setfirstName(e.target.value)
                            if (isSubmitted) {
                                if (!e.target.value) {
                                   return setError("required field Firstname is empty")
                                    
                                }
                                setError("")
                                // eslint-disable-next-line
                                if (e.target.value.length <= 2) {
                                   return setError("Invalid Firstname");
                                    
                                }
                                setError("")
                            }

                        }} 
                        placeholder="Firstname" 
                        />
                        {error && (error.includes("firstName") || error.includes("Firstname")) ? (
                            <span className="text-danger">{error}</span>
                        ) : ""
                        }
                    </div>

                    <div className="col-12 mb-2">
                    <input type="text" onChange={(e) => {
                            setlastName(e.target.value)
                            if (isSubmitted) {
                                if (!e.target.value) {
                                   return setError("required field Lastname is empty")
                                    
                                }
                                setError("")
                                // eslint-disable-next-line
                                if (e.target.value.length <= 2) {
                                   return setError("Invalid Lastname");
                                    
                                }
                                setError("")
                            }
                        }} 
                        placeholder="Lastname" 
                        />
                        {error && (error.includes("lastName") || error.includes("Lastname")) ? (
                            <span className="text-danger">{error}</span>
                        ) : ""
                        }
                    </div>



                    <div className="col-12 mb-2">
                        <input type="text" onChange={(e) => {
                            setEmail(e.target.value)
                            if (isSubmitted) {
                                if (!Email) {
                                    setError("required field email is empty")
                                    return;
                                }
                                setError("")
                                // eslint-disable-next-line
                                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email)) {
                                    setError("Invalid email");
                                    return;
                                }
                                setError("")
                            }
                        }} placeholder="Email" />
                        {error && (error.includes("email") || error.includes("Email")) ? (
                            <span className="text-danger">{error}</span>
                        ) : ""
                        }
                    </div>

                    <div className="col-12 mb-2">
                        <input type="password" placeholder="Password" onChange={(e) => {
                            setPassword(e.target.value)
                            if (isSubmitted) {
                                if (!Password) {
                                    setError("required field password is empty")
                                    return;
                                }
                                setError("")
                            }
                        }} />

                        {
                            error && (error.includes("password") || error.includes("Password")) ? (
                                <span className="text-danger">{error}</span>
                            ) : ""
                        }
                    </div>
                    <div className="col-12 mb-2">
                        <center>
                            <button onClick={RegisterHandler} className="btn w-100 btn-warning">Sign in</button>
                            <span>or</span>
                            <br />
                            <Link className="link" to={"/login"}>
                                <span>I have an Account</span>
                            </Link>
                        </center>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}