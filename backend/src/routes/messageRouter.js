import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { getUsersForSideBar , getMessages, sendMessage , findUsersByName} from "../controller/messageController.js";

const router = express.Router() ; 
  
router
.get("/users" , protectRoute , getUsersForSideBar) 
.get("/:id" , protectRoute , getMessages ) 
.post("/send/:id" , protectRoute , sendMessage ) 
.post("/find" , protectRoute , findUsersByName ) 


export default router ; 
