import express, { Router } from "express" ; 
import { signup ,login , logout , getAllUsers } from "../controller/authcontroller.js";
const router = express.Router () ; 


router
.get("/" , (req, res)=>{
    res.json({ status : " Everything is fine"}) ;
})
.get('/allusers' , getAllUsers) 
.post('/signup' , signup) 
.post('/login' , login)  
.post('/logout' , logout)  


export default router ; 