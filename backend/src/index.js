import express from "express";
import mongoose from "mongoose" ; 
import authRoutes from './routes/authRouter.js' ; 
import dotenv from 'dotenv' ; 

const app = express() ;

dotenv.config() ; 

// here we are calling the dot env and configuring it so we can use the data 
const port = process.env.PORT ; 
const connectionString = process.env.MONGODB_URL ;

async function database() {
    await mongoose.connect(connectionString).then( e => console.log("Database connected") ); 
} ; 

app.use( express.json()) ; 
app.use( "/app/auth" , authRoutes) ;
app.listen( port , ()=>{
    console.log(`server started at ${port}`) ; 
    // putting the database calling function in after the server is setup 
    database () ; 
 
})
  