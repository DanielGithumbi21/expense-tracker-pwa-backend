const mongoose = require("mongoose");

const incomeSchema = mongoose.Schema({
  name: String,
  transactionDate: Date,
  category: String,
  amount: Number,
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ExpenseTrackerUsers",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Incomes = mongoose.model("Incomes", incomeSchema);
module.exports = Incomes;
