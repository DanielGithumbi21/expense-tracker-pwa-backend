const bcrypt = require("bcryptjs");
const Users = require("../models/users");
const jwt = require("jsonwebtoken");
exports.createUser = async (req, res) => {
  try {
    let { email, password, name } = req.body;
    const previousUser = await Users.findOne({ email });
    if (previousUser) {
      return res
        .status(403)
        .json({ Error: "User already exists, please login" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await Users.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(201).json({ result, token });
  } catch (error) {
    console.log(error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await Users.findOne({ email });
    if (!existingUser) {
      return res
        .status(403)
        .json({ Error: "The user does not exist, please register" });
    }
    const isCorrectPassword = bcrypt.compareSync(
      password,
      existingUser.password
    );
    if (!isCorrectPassword) {
      return res.status(403).json({
        Error: "The password entered is incorrect, please try again",
      });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.json({ user: existingUser, jwt: token });
  } catch (error) {
    console.log(error);
  }
};

exports.changePassword = async (req, res) => {
  try {
    let { email, password } = req.body;
    const existingUser = Users.findOne({ email });
    if (!existingUser) {
      return res.json({ Error: "The user does not exist, please register" });
    }
    const newPassword = await bcrypt.hash(password, 12);
    await Users.updateOne(
      { email },
      {
        $set: {
          password: newPassword,
        },
      }
    ).then((result) => {
      return res.status(200).json(result);
    });
  } catch (error) {
    console.log(error);
  }
};
