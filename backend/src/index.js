import express from "express";
import mongoose from "mongoose" ; 
import authRoutes from './routes/authRouter.js' ;
import messageRoutes from './routes/messageRouter.js' ;
import cors from 'cors' ; 
import dotenv from 'dotenv' ; 
import cookieParser from "cookie-parser" ; 
import { app  , server } from "./lib/socket.js";
import path from "path" ;
//  remove this line because we have already added the using server.io  server 
// const app = express() ;
const __dirname = path.resolve() ; 
app.use(cookieParser()) ; 

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true 
}))  ; 

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb' , extended : true }));

app.use( "/app/auth" , authRoutes) ;
app.use( "/app/messages" , messageRoutes) ;
dotenv.config() ; 

// here we are calling the dot env and configuring it so we can use the data 
const port = process.env.PORT ; 
const connectionString = process.env.MONGODB_URL ;

async function database() {
    await mongoose.connect(connectionString).then( e => console.log("Database connected") ); 
} ; 

// After applying cookie-parser middleware, you can easily access the cookies in your application via req.cookies 
if ( process.env.NODE_ENV === "production"){
    app.use( express.static(path.join( __dirname , "../frontend/dist"))) ;

    app.get("*" , ( req , res)=>{
        res.sendFile(path.join(__dirname , "../frontend" , "dist" , "index.html"))
    })
}

server.listen( port , ()=>{
    console.log(`server started at ${port}`) ; 
    // putting the database calling function in after the server is setup  
    database () ; 
 
})
  