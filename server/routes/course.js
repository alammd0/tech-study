const {
  createCourse,
  updateCourse,
  getAllCourse,
  getSingleCourse,
  deleteCourse,
} = require("../controllers/course");
const express = require("express");
const { isAuthenticated, isAdmin, isUser } = require("../middlewares/Auth");
const router = express.Router();

// this route is for creating a course by admin not user
router.post("/create-course", isAuthenticated, isAdmin, createCourse);
router.put("/:id", isAuthenticated, isAdmin, updateCourse);
router.delete("/delete-course/:id", isAuthenticated, isAdmin, deleteCourse);

// get only user
router.get("/get-all-course", getAllCourse);
router.get("/get-single-course/:id", getSingleCourse);

module.exports = router;
