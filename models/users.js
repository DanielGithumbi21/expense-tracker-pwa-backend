const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  createdAt: {
    type: String,
    default: Date.now(),
  },
});

const Users = mongoose.model("ExpenseTrackerUsers", userSchema);

module.exports = Users;
