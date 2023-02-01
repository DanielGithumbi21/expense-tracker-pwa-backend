const mongoose = require("mongoose");

const spendingSchema = mongoose.Schema({
  income: Number,
  budget: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ExpenseTrackerUsers",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Spendings = mongoose.model("spendings", spendingSchema);

module.exports = Spendings;
