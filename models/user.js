const mongoose = require("mongoose");

// User model
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thought",
    },
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

// Virtual for friendCount
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = mongoose.model("User", userSchema);

module.exports = User;