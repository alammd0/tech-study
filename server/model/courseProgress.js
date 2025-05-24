const mongoose = require("mongoose");

const courseProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },

  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Section",
  },

  progress: {
    type: Number,
    default: 0,
  },
});
