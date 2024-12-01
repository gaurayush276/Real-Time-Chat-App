import { Schema } from "mongoose";
import mongoose from "mongoose";
const messageSchema = new Schema({
    senderId :{
         type : mongoose.Schema.Types.ObjectId ,
         ref : "User" , 
         required: true , 
    }  ,
    receiverId :{
         type : mongoose.Schema.Types.ObjectId ,
         ref : "User" , 
         required: true , 
    }  ,
    text :{
        type : String 
    } ,
     image :{ type : String }
} , {
    timestamps : true 
}
)

const Message = mongoose.model("Messages" , messageSchema) ; 

export default Message ; 