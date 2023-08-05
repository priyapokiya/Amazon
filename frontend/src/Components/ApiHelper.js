import axios from "axios";

class ApiHelper {
    constructor() {
        this.baseURL = "http://localhost:5000"

        this.token = JSON.parse(localStorage.getItem("token"))
    }

    fetchProducts() {
        // return axios.get(`${this.baseURL}/product`)
        return axios.get(this.baseURL + "/product")
    }

    fetchProductById(id) {
        return axios.get(this.baseURL + "/product/" + id)
    }

    userLogin(data) {
        return axios.post(this.baseURL + "/user/login", data)
    }

    userRegister(data) {
        return axios.post(this.baseURL + "/user/register", data)
    }

    fetchCart(products) {
        return axios.post(`${this.baseURL}/cart`, { products: products })
    }

    PlaceOrder(OrderDetails){
        return axios.post(this.baseURL + "/neworder" , OrderDetails , {headers : {token:this.token}})
    }
}

const apiHelper = new ApiHelper()
export default apiHelper