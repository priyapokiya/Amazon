import mongoose from "mongoose";

const ConnectDB = async() =>{
    try {
        await mongoose.connect('mongodb://localhost:27017/amazon')
        console.log("DB Connected");

    } catch (error) {
        console.log("DB Connection Loss");
    }
}

export default ConnectDB