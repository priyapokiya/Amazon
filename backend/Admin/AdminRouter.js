import express from "express"
import adminuserController from "./Admin_User/UserController.js"
import mediaController from "./Media/MediaController.js"

const AdminRouter =  express.Router()

AdminRouter.post("/createuser" , adminuserController.CreateUser)

AdminRouter.delete("/delete/:id",adminuserController.RemoveUser)

AdminRouter.put("/update/:id",adminuserController.UpdateUser)

AdminRouter.post("/login",adminuserController.Userlogin)

AdminRouter.get("/getuser",adminuserController.GetUser)

AdminRouter.post("/upload" , mediaController.GetMedia)

export default AdminRouter


