const express = require("express");
const { isAuthenticated, isAdmin, isUser } = require("../middlewares/Auth");
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/section");

const router = express.Router();

// create path
router.post("/create-section", isAuthenticated, isAdmin, createSection);
router.put("/update-section/:id", isAuthenticated, isAdmin, updateSection);
router.delete("/delete-section/:id", isAuthenticated, isAdmin, deleteSection);

module.exports = router;