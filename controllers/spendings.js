const Spendings = require("../models/spendings");
const jwt = require("jsonwebtoken");

exports.getSingleSpending = async (req, res) => {
  try {
    const currentUser = req.user;
    await Spendings.findOne({ user: currentUser.id })
      .then((result) => {
        if (!result)
          return res.status(400).json({ Error: "spending does not exist" });
        res.status(200).json(result);
      })
      .catch((error) => console.error(error));
  } catch (error) {
    console.log(error);
  }
};

exports.createSpending = async (req, res) => {
  try {
    const currentUser = req.user;
    let { income, budget } = req.body;

    const spendings = await Spendings.create({
      income,
      budget,
      user: currentUser.id,
    });
    return res.status(200).json(spendings);
  } catch (error) {
    console.log(error);
  }
};
