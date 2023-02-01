const express = require("express");
const userController = require("../controllers/users");
const router = express.Router();

router.route("/login").post(userController.loginUser);

router.route("/register").post(userController.createUser);

module.exports = router;
