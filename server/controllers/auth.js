// Here Write the controller for the auth routes
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Here signup controller
const signup = async (req, res) => {
  try {
    // fetch data from request body
    const { firstName, lastName, email, phoneNumber, password, accountType } =
      req.body;

    // validate data
    if (!firstName || !lastName || !email || !phoneNumber || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    // check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
      accountType,
    });

    // genrate the token
    const payload = {
      userId: newUser._id,
      firstName,
      email,
      accountType: accountType,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log("Token : ", token);

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        accountType,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error, Please try again later",
    });
  }
};

// Here signin controller
const signin = async (req, res) => {
  try {
    // fetch data from request body
    const { email, password } = req.body;

    // all fields are required
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    // check if user already exists
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(400).json({
        success: false,
        message: "User does not exists, please signup",
      });
    }

    // genrate the token
    const payload = {
      userId: userExists._id,
      firstName: userExists.firstName,
      email: userExists.email,
      accountType: userExists.accountType,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log("Token : ", token);

    // check if password is correct or not
    const ispasswordCorrect = await bcrypt.compare(
      password,
      userExists.password
    );

    if (!ispasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials, Please check your email and password",
      });
    }

    // create user

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        firstName: userExists.firstName,
        lastName: userExists.lastName,
        email: userExists.email,
        phoneNumber: userExists.phoneNumber,
        accountType: userExists.accountType,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error, Please try again later",
      next: err,
    });
  }
};

module.exports = {
  signup,
  signin,
};
