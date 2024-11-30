import { generateToken } from "../lib/utils.js";
import User from "../models/usermodels.js";
import bcrypt from "bcryptjs"

export const signup = async (req, res)=>{
    const { fullName , password , email } = await req.body ; 
    // checking the valid password  
    if ( !fullName  || !email  || !password )  
        return res.status(400). json({ messege : "Please enter valid email or User Name "})
    
    if ( password.length < 6 )
      return res.status(400).json( {messege : ' Password must be atleat 6 characters long ' }) ; 

    // checking if the user already exists 
    const check =await User.findOne( {email} ) ; 
    if ( check )
        return res.json( { messege : " Email already exists "}) ; 

    // encoding the password in hash
    // A salt is a random string added to the password before hashing to ensure the resulting hash is unique, even if two users have the same password.
    const salt = await bcrypt.genSalt( 10 ) ; 
    const hashedPassword = await bcrypt.hash(password , salt )  ; 

    const newUser = new User ({
        fullName , 
        email ,
        password: hashedPassword 
    }) ; 

    if ( newUser ) {
        // generate jwt
        generateToken( newUser._id , res ) ; 
        await newUser.save() ;

        res.status( 201) . json( newUser ) ;
    }
    else {
            res.status(400).json({ messege : "invalid user data"})  ;
    }
     
    

    
}
export const login = (req, res)=>{
    res.json( "sign up") ; 
}
export const logout = (req, res)=>{
    res.json( "logout") ; 
}


export const getAllUsers =async ( req, res) =>{
    const data =  await User.find() ; 
    res.status(200).json(data) ; 
}