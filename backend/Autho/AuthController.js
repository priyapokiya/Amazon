import Jwt  from "jsonwebtoken";

class AuthController{

    async CreateOrederAuth(req,res,next){
        try {
            // console.log(req);
            const token = req.headers.token
            // console.log(token);
            if(!token) return res.status(400).send({message:"Unauthorised token"})

            return Jwt.verify(token,process.env.JWT_SECRATE,(err,data) =>{
                if(data){
                    req.body.userInfo = data
                    return next()
                }
                if(err)
                console.log(err);
                return res.status(400).send({message:"Unauthorised"})
            })
        } catch (error) {
            console.log(error);
            return res.status(500).send({message:"Internal Server Error"})
        }
    }
}

const authController = new AuthController()
export default authController