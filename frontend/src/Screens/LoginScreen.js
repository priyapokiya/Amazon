import { useState } from "react";
import { Link,  useNavigate } from "react-router-dom";
import apiHelper from "../Components/ApiHelper";
import Loader from "../Components/Loader";
import CheckoutSteps from "../Components/CheckoutSteps";

export default function LoginScreen() {
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [isSubmitted, setisSubmitted] = useState(false)
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const[isLoading,setisLoading] = useState(false)



    const LoginHendler = async () => {
        try {
            setisSubmitted(true)
            if (!Email) {
                setError("required field email is empty")
                return;
            }
            // eslint-disable-next-line
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email))) {
                setError("Invalid email")
                return
            }

            if (!Password) {
                setError("required field password is empty")
                return;
            }
           setisLoading(true)
            const result = await apiHelper.userLogin({ email: Email, password: Password })

            setisLoading(false)
            if (result && result.status === 200) {
                localStorage.setItem("userInfo", JSON.stringify(result.data.user))
                localStorage.setItem("token", JSON.stringify(result.data.user.token))
                navigate("/")
            }
        } catch (error) {
            setisLoading(false)
            if (error && error.response && error.response.data) {
                setError(error.response.data.message)
            }
        }
    }

    console.log(isSubmitted);
    return (
        <>
        <CheckoutSteps signin = {true}/>

        <div className="d-flex login justify-content-center pt-5" style={{ position:"relative" }} >
            <Loader isLoading={isLoading} />
            <div className="card shadow-lg" style={{ width: "25rem" }}>
                <div className="px-4 py-2">
                    <h5 className="mb-0">Login</h5>
                </div>
                <div className="card-body bg-light">
                    <div className="row">
                        <div className="col-12 mb-2">
                            <input type="email" onChange={(e) => {
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
                                <button onClick={LoginHendler} className="btn w-100 btn-warning">Sign in</button>
                                <span>or</span>
                                <br />
                                <Link className="link" to={"/register"}>
                                    <span>Create an Account</span>
                                </Link>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )

}




