const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../model/user");


// Middleware to check if the user is authenticated
const isAuthenticated = async (req, res, next) => {
  try {
    // fetch token from request header
    const token =
      req.header("Authorization").replace("Bearer ", "") ||
      req.cookies.token ||
      req.body.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided, please login again",
      });
    }

    // verify the token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // find the user by id
      console.log("Decoded Token : ", decoded);
      req.User = decoded;
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid token, please login again",
      });
    }

    next();

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// middleware to check if user is Admin

const isAdmin = async (req, res, next) => {
    try{


        console.log("User : ", req.User);
        const user = req.User.accountType;
        console.log("User Account Type : ", user);

        if(user !== "Admin"){
            return res.status(403).json({
                success: false,
                message: "You are not authorized to access this resource",
            });
        }

        next();
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "This is not an admin, please login as admin",
        });
    }
}

// middleware to check is user is User
const isUser = async (req, res, next) => {
    try{

        const user = req.User.accountType;

        if(user !== "Admin"){
            return res.status(403).json({
                success: false,
                message: "You are not authorized to access this resource",
            });
        }

        next();

    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "This is not a user, please login as user",
        });
    }
}


module.exports = {
  isAuthenticated,
  isAdmin,
  isUser,
};