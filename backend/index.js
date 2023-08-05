import express, { json } from "express";
import productController from "./Product/ProductController.js";
import cors from "cors";
import ConnectDB from "./Connection.js";
import userController from "./User/UserController.js";
import dotenv from "dotenv"
import authController from "./Autho/AuthController.js";
import orderController from "./Order/OrderController.js";
import AdminRouter from "./Admin/AdminRouter.js";
import fileUpload from "express-fileupload";
dotenv.config()

ConnectDB()

const app = express()
app.use(cors())
app.use(json())

app.get("/", (req, res) => {
    return res.status(200).send({ message: "success" })
})


app.use(fileUpload())

app.use("/file", express.static("./Uploads"))

app.get("/product", productController.getProduct)
app.get("/product/:id", productController.getProductById)
app.post("/cart", productController.Getcart)

app.post("/user/register", userController.RagisterUser)
app.post("/user/login", userController.Userlogin)

app.post("/neworder", authController.CreateOrederAuth, orderController.CreateOrder)

// app.get("/product/insert/many",productController.insertMany)

app.use("/admin", AdminRouter)


app.listen(process.env.PORT, () => {
    console.log("server started");
})
