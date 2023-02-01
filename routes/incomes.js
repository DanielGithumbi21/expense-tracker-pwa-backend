const express = require("express");
const router = express.Router();
const incomeController = require("../controllers/incomes");

router.route("/").post(incomeController.createIncome);

router.route("/:id").get(incomeController.getAllIncomes);

router.route("/single/:id").get(incomeController.getSingleIncome);

module.exports = router;
