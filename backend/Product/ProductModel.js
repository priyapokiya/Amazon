import mongoose from "mongoose";

class ProductModel{
    constructor(){
        this.schema = new mongoose.Schema({

            name:{type:String,require:true},
            alias:{type:String,require:true,unique:true},
            category:{type:String,require:true},
            image:{type:String,require:true},
            image1:{type:String,require:true},
            image2:{type:String,require:true},
            image3:{type:String,require:true},
            brand:{type:String,require:true},
            description:{type:String,require:true,default:null},
            price:{type:Number,require:true},
            rating:{type:Number,require:true},
            numReviews:{type:Number,require:true},
            countInstock:{type:Number,require:true},
        })
    }
}

const product = new ProductModel()
const productModel = mongoose.model("tbl_product",product.schema)
export default productModel