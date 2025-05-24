
const {createCourse} = require('../controllers/course');
const express = require('express');
const {isAuthenticated, isAdmin} = require('../middlewares/Auth');
const router = express.Router();


// this route is for creating a course by admin not user
router.post("/create-course", isAuthenticated, isAdmin, createCourse);

module.exports = router;