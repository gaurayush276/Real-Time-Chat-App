import Message from "../models/messegeModel.js";
import User from "../models/usermodels.js";
import { v2 as cloudinary } from "cloudinary"

export const getUsersForSideBar = async ( req , res)=>{
    const loggedInUserId =  req.user._id  ; 
    const allUser = await User.find({ _id :{ $ne : loggedInUserId}}).select("-password") ; 

    res.status(200).json(allUser) ; 


}

export const getMessages = async (req , res)=>{
    const { id : userToChatId} = req.params ; 
    const myId = req.user._id ; 

    const message = await Message.find({
         $or :[
            // we have to show the mutual  conversation 
            {senderId : myId , receiverID : userToChatId} ,
            {senderId : userToChatId , receiverID : myId} 
         ] 
    })

    res.status(200).json(message) ; 
} ;


export const sendMessage =async (req, res)=>{
    const { id : receiverId } = req.params ; 
    const senderId = req.user._id ; 
    const { text , image } = req.body ;

    let imageUrl ; 
    if ( image ) {
        const upload = await cloudinary.uploader.upload( image) ; 
        imageUrl = upload.secure_url ; 
    }

    const newMessage = new Message ({
        senderId , 
        receiverId , 
        image : imageUrl ,
        text 
    })
    await newMessage.save() ;

    // RealTime functionality goes here 

    res.status(201).json(newMessage) ; 
}