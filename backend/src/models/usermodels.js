import mongoose, { Schema } from "mongoose";

const user = new Schema({
    email :{type : String , required : true , unique :true } , 
    fullName : { type : String , required : true } , 
    password : {type : String , required :true , minlength : 6  } ,
    profilePic :{  type :String , default : ""}, 
}  , 
 {
    timestamps : true 
 }

 , )


const User  = mongoose.model ( "User" , user ) ; 

export default  User ; 