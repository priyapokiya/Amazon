import mongoose from "mongoose";

class MediaModel{
    constructor(){
        this.schema = new mongoose.Schema({
            name:{type:String , required : true},
            mimetype:{type:String , required : true},
            ext:{type:String , required : true},
            path:{type:String , required : true},
            size:{type:String , required : true},
            rendersize:{type:String , default : null},
            uploadedby:{type:String , default:null},
            filepurpose:{type:String , default:null}
        },{
            timestamps:true
        })
    }
}

const mediamodel = new MediaModel()
const mediaModel = mongoose.model("tbl_media",mediamodel.schema)
export default mediaModel