const bcrypt = require("bcryptjs");
const Users = require("../models/users");
const jwt = require("jsonwebtoken");
const jwtSecret = "hehyheyhhyehhyehhye";
exports.createUser = async (req, res) => {
  try {
    let { email, password, name } = req.body;
    const previousUser = await Users.findOne({ email });
    if (previousUser) {
      return res.status(403).json("User already exists, please login");
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await Users.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, jwtSecret, {
      expiresIn: "1h",
    });

    return res.status(201).json({ result, token });
  } catch (error) {
    console.log(error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await Users.findOne({ email });
    console.log(existingUser);
    if (!existingUser) {
      return res.json("The user does not exist, please register");
    }
    const isCorrectPassword = bcrypt.compareSync(
      password,
      existingUser.password
    );
    if (!isCorrectPassword) {
      return res.json("The password entered is incorrect, please try again");
    }
    const token = jwt.sign(
      { email: existingUser, id: existingUser._id },
      jwtSecret,
      { expiresIn: "1h" }
    );
    return res.json({ user: existingUser, jwt: token });
  } catch (error) {
    console.log(error);
  }
};
