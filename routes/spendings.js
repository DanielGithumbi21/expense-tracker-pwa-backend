const express = require("express");
const router = express.Router();

const spendingsController = require("../controllers/spendings");

router.route("/").post(spendingsController.createSpending);

router.route("/:id").get(spendingsController.getSingleSpending);

module.exports = router;
