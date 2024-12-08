import express from "express";
import mongoose from "mongoose" ; 
import authRoutes from './routes/authRouter.js' ;
import messageRoutes from './routes/messageRouter.js' ;
import cors from 'cors' ; 
import dotenv from 'dotenv' ; 
import cookieParser from "cookie-parser" ; 
const app = express() ;
app.use(cookieParser()) ; 


app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb' , extended : true }));

app.use( "/app/auth" , authRoutes) ;
app.use( "/app/messages" , messageRoutes) ;
app.use(cors())  ; 
dotenv.config() ; 

// here we are calling the dot env and configuring it so we can use the data 
const port = process.env.PORT ; 
const connectionString = process.env.MONGODB_URL ;

async function database() {
    await mongoose.connect(connectionString).then( e => console.log("Database connected") ); 
} ; 

// After applying cookie-parser middleware, you can easily access the cookies in your application via req.cookies 
app.listen( port , ()=>{
    console.log(`server started at ${port}`) ; 
    // putting the database calling function in after the server is setup  
    database () ; 
 
})
  