const Course = require("../model/course");
const Category = require("../model/category");
const User = require("../model/user");
const { uploadImage } = require("../utils/uploads");

// course Create controller
exports.createCourse = async (req, res) => {
  try {
    const userId = req.User.userId;
    console.log("Req ki body: ", req.body);
    const { title, description, category, price, tags, benefits, intruction } = req.body;

    // Validate required fields
    if (!title || !description || !category || !price || !tags || !benefits || !intruction) {
      return res.status(400).json({ success: false, message: "Please fill all the fields" });
    }

    const thumbnail = req.file ? req.file.path : null;
    if (!thumbnail) {
      return res.status(400).json({ success: false, message: "Please upload a thumbnail" });
    }

    // Check if user is admin
    const user = await User.findById(userId);
    if (!user || user.accountType !== "Admin") {
      return res.status(403).json({ success: false, message: "You are not authorized to create a course" });
    }

    // Check if category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    // Upload thumbnail to cloudinary
    const thumbnailUrl = await uploadImage(thumbnail, process.env.CLOUDINARY_FOLDER_NAME);
    console.log("Thumbnail URL: ", thumbnailUrl);

    // Create course
    const newCourse = await Course.create({
      title,
      description,
      price,
      category: categoryExists._id,
      tags: Array.isArray(tags) ? tags : tags.split(",").map(tag => tag.trim()),
      benefits: Array.isArray(benefits) ? benefits : benefits.split(",").map(b => b.trim()),
      thumbnail: thumbnailUrl.secure_url,
      intruction,
      instructor: userId,
    });

    // Update user and category with course reference
    await User.findByIdAndUpdate(userId, { $push: { courses: newCourse._id } });
    await Category.findByIdAndUpdate(categoryExists._id, { $push: { courses: newCourse._id } });

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Create Course error, Please try again later" });
  }
};

// course Update controller

// get all courses controller

// course Delete Controller
