const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  dob: {
    type: Date,
    trim: true,
  },

  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },

  about: {
    type: String,
    trim: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
