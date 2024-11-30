import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { getUsersForSideBar , getMessages, sendMessage } from "../controller/messageController.js";

const router = express.Router() ; 
  
router
.get("/users" , protectRoute , getUsersForSideBar) 
.get("/:id" , protectRoute , getMessages ) 
.get("/send/:id" , protectRoute , sendMessage ) 


export default router ; 
