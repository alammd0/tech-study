const Category = require("../model/category"); 
const User = require("../model/user");

// create a new category
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // validate data
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Please provide a category name",
      });
    }

    // check if category already exists
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    // create category
    const newCategory = await Category.create({
      name,
      createdBy: req.User._id,
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Error creating category, please try again later",
    });
  }
};

// get all categories
const getAllCategories = async (req, res) => {
  try {
    // fetch all categories
    const categories = await Category.find();

    if (!categories || categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No categories found",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Categories fetched successfully",
        data: categories,
      });
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Error fetching categories, please try again later",
    });
  }
};

// delete a category
const deleteCategory = async (req, res) => {
  try {

    const { id } = req.params;
    const categoryId = id;

    // validate data
    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Please provide a category ID",
      });
    }

    // check if category exists
    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    await Category.findByIdAndDelete(categoryId);
    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Error deleting category, please try again later",
    });
  }
};

module.exports = {
    createCategory,
    getAllCategories,
    deleteCategory,
}
