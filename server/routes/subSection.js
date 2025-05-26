const express = require("express");
const {createSubsection, updateSubSection, deleteSubSection} = require("../controllers/subsection");
const router = express.Router();
const {isAuthenticated, isAdmin} = require("../middlewares/Auth");


// create path 
router.post("/ceate-sub-section", isAuthenticated, isAdmin, createSubsection);
router.put("/update-sub-section", isAuthenticated, isAdmin, updateSubSection);
router.delete("/delete-sub-section", isAuthenticated, isAdmin, deleteSubSection);


module.exports = router
