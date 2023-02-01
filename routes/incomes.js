const express = require("express");
const router = express.Router();
const incomeController = require("../controllers/incomes");

router.route("/").post(incomeController.createIncome);

router.route("/:id").get(incomeController.getAllIncomes);

router.route("/single/:id").get(incomeController.getSingleIncome);

router.route("/aggregate/:id").get(incomeController.getAggregateIncomes);

router.route("/income-data/:id").get(incomeController.getIncomesData);

router
  .route("/targetedincomevsincome/:id")
  .get(incomeController.getIncomeVsTargetedIncome);

module.exports = router;
