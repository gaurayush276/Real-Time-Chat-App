import jwt from "jsonwebtoken";
import User from "../models/usermodels.js";

export const protectRoute = async (req, res, next) => {
    try {
        // Get the token from the cookies
        const token = req.cookies.jwt ;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token found" });
        }

        // Verify the token (check if it's expired or invalid)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized: Invalid Token" });
        }

        // Fetch the user from the database, excluding the password field
        const user = await User.findById(decoded.userId).select("-password");
        // console.log(user) ; 

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Attach the user to the request object so the next middleware can access it
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Error in protectRoute middleware:", error);
        res.status(500).json({ message: "Server error" });
    }
};
