const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenses");

router.route("/").post(expenseController.createExpense);

router.route("/:id").get(expenseController.getAllExpenses);

router.route("/single/:id").get(expenseController.getSingleExpense);

module.exports = router;
