import Razorpay from "razorpay"
import deliveryDay from "../Constant.js"
import orderModel from "./OrderModel.js"



function  CreateRazorPayOrder(options){
    return new Promise((resolve,reject) =>{
        var instance = new Razorpay({
            key_id:process.env.API_KEY,
            key_secret:process.env.kEY_SECRATE
        })
        instance.orders.create(options, (err,order) =>{
            if(err) return reject(err)
            resolve(order)
        })
    })
}

class OrderController{
    async CreateOrder(req,res){
        try {
            const {products , paymentMethod ,shippingAddress , userInfo , totalPrice} = req.body

            if(!products) return res.status(500).send({message:"Missing Dependancy Products"})
            if(!paymentMethod) return res.status(500).send({message:"Missing Dependancy Paymentmethod"})
            if(!shippingAddress) return res.status(500).send({message:"Missing Dependancy ShippingAddress"})
            if(!userInfo) return res.status(500).send({message:"Missing Dependancy UserInfo"})

            const deliveryDate = new Date()
            deliveryDate.setDate(deliveryDate.getDate() + deliveryDay)

            const OrderDetails = {
                products,
                paymentMethod,
                shippingAddress, 
                user: userInfo, 
                deliveredIn : deliveryDate,
                totalPrice
            }


            let order = await orderModel.create(OrderDetails)
            order = {...order._doc,RazorpayDetails:null}
            if(paymentMethod === "cod"){
                if(!order) return res.status(500).send({message:"Somthing want wrong"})
                return res.status(200).send({message:"success" , order})
            }else{
                const options = {
                    amount:totalPrice * 100,
                    currency: "INR",
                    receipt:"recpt_id" + order._id
                }
                const RazorPayResult = await CreateRazorPayOrder(options)
                if(!RazorPayResult) return res.status(500).send({message:"Somthing want wrong nnnnn"})
                order = {
                    ...order,
                    RazorpayDetails:{...RazorPayResult , apikey:process.env.API_KEY}
                }
                return res.status(200).send({message:"Success" , order})
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send({message:"Internal server error"})
        }
    }
}

const orderController = new OrderController()

export default orderController