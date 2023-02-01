const Spendings = require("../models/spendings");

exports.getSingleSpending = async (req, res) => {
  try {
    await Spendings.findOne({ user: req.params.id })
      .then((result) => {
        if (!result)
          return res.status(400).json({ Error: "spending does not exits" });
        res.status(200).json(result);
      })
      .catch((error) => console.error(error));
  } catch (error) {
    console.log(error);
  }
};

exports.createSpending = async (req, res) => {
  try {
    let { income, budget, user } = req.body;

    const spendings = await Spendings.create({ income, budget, user });
    return res.status(200).json(spendings);
  } catch (error) {
    console.log(error);
  }
};
