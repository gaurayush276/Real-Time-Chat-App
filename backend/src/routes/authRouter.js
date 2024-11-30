import express, { Router } from "express" ; 
import { signup ,login , logout , getAllUsers, updateProfile  , checkAuth } from "../controller/authcontroller.js";
import { protectRoute } from "../middleware/authMiddleware.js";
const router = express.Router () ; 


router
.get("/" , (req, res)=>{
    res.json({ status : " Everything is fine"}) ;
})
.get('/allusers' , getAllUsers) 
.post('/signup' , signup) 
.post('/login' , login)  
.post('/logout' , logout) 
.put("/update-profile" , protectRoute ,  updateProfile) 
// we  are using it because if we refresh our page then it has to check if the user is authenticated or not 
.get('/check' , protectRoute ,  checkAuth ) ; 


export default router ; 