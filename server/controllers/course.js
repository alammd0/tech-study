const Course = require("../model/course");
const Category = require("../model/category");
const User = require("../model/user");
const { imageUploadCloudinary } = require("../utils/uploads");

// course Create controller
const createCourse = async (req, res) => {
  try {
    const userId = req.User.userId;

    // console.log("Req ki body: ", req.body);
    const { title, description, category, price, tags, benefits, intruction } =
      req.body;

    // Validate required fields
    if (
      !title ||
      !description ||
      !category ||
      !price ||
      !tags ||
      !benefits ||
      !intruction
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }

    // console.log("File: ", req.files);

    const thumbnail = req.files.thumbnail;
    // console.log("Thumbnail: ", thumbnail);
    if (!thumbnail) {
      return res
        .status(400)
        .json({ success: false, message: "Please upload a thumbnail" });
    }

    // Check if user is admin
    const user = await User.findById(userId);
    // console.log("User: ", user);
    if (!user || user.accountType !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to create a course",
      });
    }

    // Check if category exists
    const categoryExists = await Category.findById(category);
    // console.log("Category Exists: ", categoryExists);

    if (!categoryExists) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    // let height = "400"

    const thumbnailUrl = await imageUploadCloudinary(
      thumbnail,
      process.env.CLOUDINARY_FOLDER_NAME
      // height
    );

    console.log("Thumbnail URL: ", thumbnailUrl);

    // Create course
    const newCourse = await Course.create({
      title,
      description,
      price,
      category: categoryExists._id,
      tags: Array.isArray(tags)
        ? tags
        : tags.split(",").map((tag) => tag.trim()),
      benefits: Array.isArray(benefits)
        ? benefits
        : benefits.split(",").map((b) => b.trim()),
      thumbnail: thumbnailUrl.secure_url,
      intruction,
      instructor: userId,
    });

    // Update user and category with course reference
    await User.findByIdAndUpdate(userId, { $push: { courses: newCourse._id } });
    await Category.findByIdAndUpdate(categoryExists._id, {
      $push: { courses: newCourse._id },
    });

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Create Course error, Please try again later",
    });
  }
};

// course Update controller
const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const updatedData = { ...req.body };

    // If image uploaded, upload to Cloudinary and add URL to updatedData
    if (req.files?.thumbnail) {
      const thumbnailUrl = await imageUploadCloudinary(
        req.files,
        process.env.CLOUDINARY_FOLDER_NAME
      );
      updatedData.thumbnail = thumbnailUrl.secure_url;
    }

    const updatedCourseData = await Course.findByIdAndUpdate(
      courseId,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCourseData) {
      return res.status(404).json({
        message: "Course Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course: updatedCourseData,
    });
  } catch (err) {
    console.error("Update error:", err);
    return res.status(400).json({
      message: "Error while updating course",
    });
  }
};

// get all courses controller
const getAllCourse = async (req, res) => {
  try {
    const allCourse = await Course.find({});

    return res.status(200).json({
      success: true,
      message: "Course Fetch Succesfully",
      data: allCourse,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({
      success: false,
      message: "Error While fetching All course",
    });
  }
};

// fetch signle course by Id
const getSingleCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    const courseById = await Course.findById(courseId);

    if (!courseById) {
      return res.status(404).json({
        success: false,
        message: "Course Found this course id",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course Found Sucessfully",
      data: courseById,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      success: false,
      message: "Error fetching single course",
    });
  }
};

// course Delete Controller
const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    const deleteCouse = await Course.findByIdAndDelete(courseId);

    if (!deleteCourse) {
      return res.status(404).json({
        success: false,
        message: "No, Course Found So Not delete Course",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Course Delete Succesfully..",
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({
      success: false,
      message: "Error while delete course",
    });
  }
};

module.exports = {
  createCourse,
  updateCourse, 
  getAllCourse,
  getSingleCourse,
  deleteCourse
};
