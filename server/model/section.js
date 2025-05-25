const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  sectionName: {
    type: String,
    required: true,
    trim: true,
  },

  subSections: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubSection",
  },

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  
});

const Section = mongoose.model("Section", sectionSchema);
module.exports = Section
