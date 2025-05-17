const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult} = require("express-validator");
const blackListTokenModel = require("../models/blacklistToken.model");
const bcrypt = require("bcrypt");



const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error('Hashing failed', error);
  }
};

module.exports = hashPassword;




module.exports.registerUser = async (req,res,next)=>{
 const errors = validationResult(req);  
 if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
 } 

 const {fullname , email , password} = req.body;
 
 const isUserAlready = await userModel.findOne({email});
 if(isUserAlready){
    return res.status(400).json({message: "User already exists"});
 }

 
  try {
    const hashedPassword = await hashPassword(password);

    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }

//  const hashedPassword = await userModel.hashedPassword(password);

//  const user = await userService.createUser({
//     firstname: fullname.firstname,
//     lastname: fullname.lastname,
//     email,
//     password: hashedPassword
//  });

//  const token = user.generateAuthToken();

//  res.status(201).json({token,user});
}

module.exports.loginUser = async (req,res,next)=>{
    const errors = validationResult(req);  
    if(!errors.isEmpty()){
       return res.status(400).json({errors: errors.array()});
    } 

    const {email , password} = req.body;

    const user = await userModel.findOne({email}).select("+password");

    if(!user){
        return res.status(401).json({message: "Invalid email or password"});
    }

      try {
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = user.generateAuthToken();
    res.cookie("token", token);

    res.status(200).json({ token, user });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
   //  const isMatch = await user.comparePassword(password);

   //  if(!isMatch){
   //      return res.status(401).json({message: "Invalid email or password"});
   //  }

   //  const token = user.generateAuthToken();
   //  res.cookie("token", token); 

   //  res.status(200).json({token,user});
}

module.exports.getUserProfile = async (req,res,next)=>{
      const user = await userModel.findById(req.user._id).select("-password");
   
      if(!user){
         return res.status(404).json({message: "User not found"});
      }
   
      res.status(200).json({user});
   }

module.exports.logoutUser = async (req,res,next)=>{
    res.clearCookie("token");

    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    await blackListTokenModel.create({token});
    // await userModel.findByIdAndUpdate(req.user._id, {socketId: null});
    res.status(200).json({message: "Logged out successfully"});
}