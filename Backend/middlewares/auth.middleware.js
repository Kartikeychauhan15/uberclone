const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const captainModel = require("../models/captain.model");
// const userService = require("../services/user.service");
const blackListTokenModel = require("../models/blacklistToken.model");
//         return res.status(404).json({message: "User not found"});

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const isBlacklisted = await userModel.findOne({ token:token });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
          // Validate ObjectId
        if (!mongoose.isValidObjectId(decoded._id)) {
            return res.status(400).json({ message: "Invalid captain ID" });
        }
        const captain = await captainModel.findById(decoded._id);
        req.captain = captain;
       
        if (!captain) {
            return res.status(404).json({ message: "Captain not found" });
        }
         return next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }

}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const isBlacklisted = await blackListTokenModel.findOne({ token:token });
    if (isBlacklisted) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.captain = await captainModel.findById(decoded._id);
        req.captain = captain;
        if (!req.captain) {
            return res.status(404).json({ message: "Captain not found" });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }

}