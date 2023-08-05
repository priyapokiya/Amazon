import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Header({setcartItems, cartItems }) {

  const navigate = useNavigate()
  // const CartSize = JSON.parse(localStorage.getItem("caetItems") || "[]")

  useEffect(() => {
    setcartItems(JSON.parse(localStorage.getItem("cartItems") || "[]"))
  }, [])

  // console.log(appState);
  return (

    <div className="bg-dark d-flex align-items-center justify-content-between  px-3" style={{ height: "70px" }}>
      <div className="logo text-light">
        <Link to={"/"}>
          <h3 className="fw-bold text-light">amazon</h3>
        </Link>
      </div>

      <div className="icons d-flex align-items-center gap-3">
        <i style={{ fontSize: "2rem" }} className="fas fa-shopping-cart text-light">
          <span onClick={() => navigate("/cart")} className="position-absolute top-25 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "15px" }}>

            {cartItems.length || 0}
          </span>
        </i>
        <button className="btn btn-warning" onClick={() => navigate("/login")}>{"Sign In"}</button>

      </div>

    </div>

  )
}