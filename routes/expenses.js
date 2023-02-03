const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenses");
const verifyToken = require("../middlewares/auth");

router.route("/").post(verifyToken, expenseController.createExpense);

router.route("/:id").get(verifyToken, expenseController.getAllExpenses);

router
  .route("/single/:id")
  .get(verifyToken, expenseController.getSingleExpense);

router
  .route("/aggregate/:id")
  .get(verifyToken, expenseController.getAggregateExpenses);

router
  .route("/expense-data/:id")
  .get(verifyToken, expenseController.getExpensesData);

router
  .route("/expensevsbudget/:id")
  .get(verifyToken, expenseController.getExpenseVsBudget);

module.exports = router;
