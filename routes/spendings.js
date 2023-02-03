const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth")

const spendingsController = require("../controllers/spendings");

router.route("/").post(spendingsController.createSpending);

router.route("/:id").get(verifyToken,spendingsController.getSingleSpending);

module.exports = router;
