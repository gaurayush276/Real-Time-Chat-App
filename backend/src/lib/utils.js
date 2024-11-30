import jwt from 'jsonwebtoken'
 
export const generateToken = (userId , res)=>{
    // jwt.sign: Creates a JWT
    const token = jwt.sign ( { userId } , process.env.JWT_SECRET  ,{
        expiresIn : "7d" ,
    }) ;

    res.cookie("jwt" , token , {
        maxAge : 7 * 24 * 60 * 60 * 1000 ,  // converting the age in the milisecodns  ;
        httpOnly : true , // prevents xss attacks cross-site scripting attacks
        samesite :"strict" ,
        secure : process.env.NODE_ENV  !== "development" ,
    })

    return token ; 

}



// maxAge: Specifies the lifespan of the cookie in milliseconds (7 days here).
// httpOnly: Enhances security by making the cookie inaccessible to JavaScript in the browser. This prevents XSS (Cross-Site Scripting) attacks.
// samesite: "strict": Ensures that the cookie is sent only with requests originating from the same site, preventing CSRF (Cross-Site Request Forgery) attacks.
// secure: Ensures the cookie is transmitted only over HTTPS in production. It’s false in development mode for easier testing ie : http in localhost . 