const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
    trim: true,
  },

  price: {
    type: Number,
    required: true,
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },

  tags: {
    type: [String],
    required: true,
  },

  thumbnail: {
    type: String,
    required: true,
  },

  benefits: {
    type: [String],
    required: true,
  },

  intruction: {
    type: String,
    required: true,
  },

  courseContent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
  ],

  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  ratingandReviews: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RatingAndReview",
  },
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
