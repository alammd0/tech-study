const express = require('express');
const {createCategory, deleteCategory, getAllCategories} = require('../controllers/category');
const {isAuthenticated, isAdmin} = require('../middlewares/Auth');
const router = express.Router();

// this route is for creating a category by admin not user

router.post("/create-category", isAuthenticated, isAdmin, createCategory); 
router.delete("/delete-category/:id", isAuthenticated, isAdmin, deleteCategory);

// this route is for getting all categories
router.get("/get-categories", getAllCategories);

module.exports = router;