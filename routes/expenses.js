const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenses");

router.route("/").post(expenseController.createExpense);

router.route("/:id").get(expenseController.getAllExpenses);

router.route("/single/:id").get(expenseController.getSingleExpense);

router.route("/aggregate/:id").get(expenseController.getAggregateExpenses);

router.route("/expense-data/:id").get(expenseController.getExpensesData);

router.route("/expensevsbudget/:id").get(expenseController.getExpenseVsBudget);

module.exports = router;
