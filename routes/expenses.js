const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenses");
const verifyToken = require("../middlewares/auth");

router
  .route("/")
  .post(verifyToken, expenseController.createExpense)
  .get(verifyToken, expenseController.getAllExpenses);

router
  .route("/single/:id")
  .get(verifyToken, expenseController.getSingleExpense);

router
  .route("/aggregate")
  .get(verifyToken, expenseController.getAggregateExpenses);

router
  .route("/expense-data")
  .get(verifyToken, expenseController.getExpensesData);

router
  .route("/expensevsbudget")
  .get(verifyToken, expenseController.getExpenseVsBudget);

module.exports = router;
