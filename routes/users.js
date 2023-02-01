const express = require("express");
const userController = require("../controllers/users");
const router = express.Router();

router.route("/login").post(userController.loginUser);

router.route("/register").post(userController.createUser);

router.route("/change-password/:id").patch(userController.changePassword);

module.exports = router;
