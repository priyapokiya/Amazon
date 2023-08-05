import mongoose from "mongoose";

class UserModel{
    constructor(){
        this.schema = new mongoose.Schema({
            fullName:{type:String , required:true},
            email : {type:String , required:true , unique:true},
            password : {type: String , required:true},
            roll : {type: String , required:true}
        },
        {
            timestamps:true
        })
    }
}

const adminUserModel = new UserModel()
const adminuserModel = mongoose.model("tbl_admins",adminUserModel.schema)
export default adminuserModel