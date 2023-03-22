const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema({
  name: String,
  category: String,
  transactionDate: Date,
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

const Expense = mongoose.model("expenses", expenseSchema);
module.exports = Expense;
