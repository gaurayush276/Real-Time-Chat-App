import { generateToken } from "../lib/utils.js";
import User from "../models/usermodels.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, password, email } = await req.body;
  // checking the valid password
  if (!fullName || !email || !password)
    return res
      .status(400)
      .json({ messege: "Please enter valid email or User Name or Password" });

  if (password.length < 6)
    return res
      .status(400)
      .json({ messege: " Password must be atleat 6 characters long " });

  // checking if the user already exists
  const check = await User.findOne({ email });
  if (check) return res.json({ messege: " Email already exists " });

  // encoding the password in hash
  // A salt is a random string added to the password before hashing to ensure the resulting hash is unique, even if two users have the same password.
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    fullName,
    email,
    password: hashedPassword,
  });

  if (newUser) {
    // generate jwt
    generateToken(newUser._id, res);
    await newUser.save();

    res.status(201).json(newUser);
  } else {
    res.status(400).json({ messege: "invalid user data" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = await req.body;
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ messege: " Invalid Credentials " });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ messege: " Invalid Credentials " });
    else {
      generateToken(user._id, res);
      res.status(200).json(user);
    }
  } catch {
    res.status(400).json({ messege: "There is an error in login controller " });
  }
};
export const logout = (req, res) => {
  // clearing the token
  res.cookie("jwt", "", {
    maxAge: 0,
  });
  res.status(200).json({ messege: "Successfully Logout" });
};

export const getAllUsers = async (req, res) => {
  const data = await User.find();
  res.status(200).json(data);
};

// export const updateProfile = async (req, res) => {
//   const { profilePic } = req.body;
//   const userId = req.user._id;
//   if (!profilePic)
//     return res.status(400).json({ messege: "Profile pic is required " });

//   const uploadResponse = await cloudinary.uploader.upload(profilePic);
//   const updatedUser = await User.findByIdAndUpdate(
//     userId,
//     { profilePic: uploadResponse.secure_url },
//     { new: true }
//   );
//   res.status(200).json(updatedUser);
// };

// In your backend route handler (e.g., userController.js)
export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    // Validate the base64 image
    if (!profilePic) {
      return res.status(400).json({ message: "No profile picture provided" });
    }

    // Upload to Cloudinary
    let imageUrl;
    try {
      // Remove the data URL prefix if it exists
      const base64Image = profilePic.replace(/^data:image\/\w+;base64,/, '');
      
      const uploadResponse = await cloudinary.uploader.upload(`data:image/jpeg;base64,${base64Image}`, {
        folder: 'profile_pictures',
        transformation: [
          { width: 500, height: 500, crop: "fill" }, // Optional: resize and crop
        ]
      });

      imageUrl = uploadResponse.secure_url;
      console.log( "----------- the uploaded image url is ----------" , imageUrl) ; 
    } catch (uploadError) {
      console.error("Cloudinary upload error:", uploadError);
      return res.status(500).json({ 
        message: "Image upload failed", 
        error: uploadError.message 
      });
    }

    // Update user in database
    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      { profilePic: imageUrl }, 
      { new: true }
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ 
      message: "Server error during profile update", 
      error: error.message 
    });
  }
};
export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch {
    res.status(400).json({ messege: " Error in checkAuth Controller " });
    console.log("Error in checkAuth controller ");
  }
};
