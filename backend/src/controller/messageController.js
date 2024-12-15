import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/messegeModel.js";
import User from "../models/usermodels.js";
import { v2 as cloudinary } from "cloudinary"
// import cloudinary from '../lib/cloudinary.js'
export const getUsersForSideBar = async ( req , res)=>{
    const loggedInUserId =  req.user._id  ; 
    const allUser = await User.find({ _id :{ $ne : loggedInUserId}}).select("-password") ; 

    res.status(200).json(allUser) ; 


}
export const getMessages = async (req, res) => {
    try {
      const { id: userToChatId } = req.params;
      const myId = req.user._id;
    // console.log( "---------->" , req.user._id) ; 
      const messages = await Message.find({
        $or: [
          { senderId: myId, receiverId: userToChatId },
          { senderId: userToChatId, receiverId: myId },
        ],
      });
  
      res.status(200).json(messages);
    } catch (error) {
      console.log("Error in getMessages controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };


export const sendMessage =async (req, res)=>{
    const { id : receiverId } = req.params ; 
    const senderId = req.user._id ; 
    const { text , image } = req.body ;

    let imageUrl ; 
    if ( image ) {
        try {
            const upload = await cloudinary.uploader.upload(image);
            imageUrl = upload.secure_url;
          } catch (uploadError) {
            console.error("Cloudinary upload error:", uploadError);
            return res.status(500).json({ message: "Image upload failed" });
          }
    }

    const newMessage = new Message ({
        senderId , 
        receiverId , 
        image : imageUrl ,
        text 
    })
    await newMessage.save() ;

    // RealTime functionality goes here 
    const receiverSocketID = getReceiverSocketId(receiverId) ; 
    if ( receiverSocketID){
      io.to(receiverSocketID).emit("newMessage" , newMessage) ; 
    }

    res.status(201).json(newMessage) ; 
}

export const findUsersByName = async(req , res)=>{
  const { name } = req.body ; 
  // const allUsers = await User.findOne( { fullName : name} ) ; 
  // this { $regex: name, $options: "i" } is to get the all substring
  const allUsers = await User.find({ fullName: { $regex: name, $options: "i" } });
  
  res.json ({user  : allUsers }) ;  
}