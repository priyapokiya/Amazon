import userModel from "./UserModel.js";
import bcrypt from "bcrypt"
import Jwt  from "jsonwebtoken";
import Validation from "./validation.js";

class UserController{

    async RagisterUser(req,res){
        try {
            const validationResult = Validation(req.body,"register")
            if(validationResult.length > 0){
                return res.status(400).send({message:"Validation falied",validationResult:validationResult})
            }

            const {password} = req.body
            const EncodePassword = bcrypt.hashSync(password,8)
            if(!EncodePassword){
                return res.status(500).send({message:"Somthing went Wrong"})
            }

            req.body.password = EncodePassword
            const result = await userModel.create(req.body)
            if(!result){
                return res.status(500).send({message:"Somthing went Wrong"})
            }
            let user = result._doc
    
           delete user.password

           const token = Jwt.sign({...user},process.env.JWT_SECRATE,{expiresIn:"30d"})
           if(!token) return res.status(500).send({message:"Somthing went Wrong"})
           result.token= token
           return res.status(200).send({message:"Success",user:{...user,token:token}})
            

        } catch (error) {
            // console.log(error);
            if(error && error.message && error.message.includes("E11000")){
                return res.status(400).send({message:"Validation falied",validationResult:[{key:"email",message:"Email is Already exist"}]})
            }
           return res.status(500).send({message:"Internal Server Error"})
        }
    }



    async Userlogin(req,res){
        try {
            const{email,password} = req.body
            
            const validationResult = Validation(req.body,"login")

            if(validationResult.length > 0){
                return res.status(400).send({message:"validation error", validationResult:validationResult})
            }

            const result = await userModel.findOne({email:email})


            if(!result) {
                return res.status(400).send({message:"validation error", validationResult:[{key:"email", message:"Email not Found"}]})
            }

            const user = result._doc

            if(!(bcrypt.compareSync(password,user.password))){

                return res.status(400).send({message:"validation error",validationResult:[{key:"password", message:"Email and password are not match"}]})

            }
            delete user.password

            const token = Jwt.sign(user,process.env.JWT_SECRATE,{expiresIn:"30d"})
            if(!token){
                return res.status(500).send({message:"Somthing Went Wrong"})
            }
            user.token = token

            return res.status(200).send({message:"Success",user:user})      
            
        } catch (error) {
            console.log(error);
            return res.status(500).send({message:"Internal Server Error"})
        }  
    }
}
const userController = new UserController()
export default userController