const express = require("express");
const router = express.Router();
const incomeController = require("../controllers/incomes");
const verifyToken = require("../middlewares/auth");

router.route("/").post(verifyToken, incomeController.createIncome);

router.route("/").get(verifyToken, incomeController.getAllIncomes);

router.route("/single/:id").get(verifyToken, incomeController.getSingleIncome);

router
  .route("/aggregate")
  .get(verifyToken, incomeController.getAggregateIncomes);

router.route("/income-data").get(verifyToken, incomeController.getIncomesData);

router
  .route("/targetedincomevsincome")
  .get(verifyToken, incomeController.getIncomeVsTargetedIncome);

module.exports = router;
