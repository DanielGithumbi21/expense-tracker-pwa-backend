const Incomes = require("../models/incomes");

exports.getAllIncomes = async (req, res) => {
  try {
    const incomes = await Incomes.find({ user: req.params.id });
    if (!incomes) {
      return res.status(400).json({ Error: "You do not have any incomes now" });
    } else {
      return res.status(200).json(incomes);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getSingleIncome = async (req, res) => {
  try {
    Incomes.findOne({ _id: req.params.id })
      .then((result) => {
        if (!result)
          return res.status(400).json({ Error: "Expense does not exits" });
        res.status(200).json(result);
      })
      .catch((error) => console.error(error));
  } catch (error) {
    console.log(error);
  }
};

exports.createIncome = async (req, res) => {
  try {
    let { name, transactionDate, description, amount, user } = req.body;

    const income = await Incomes.create({
      name,
      transactionDate,
      description,
      amount,
      user,
    });
    res.status(201).json(income);
  } catch (error) {
    console.log(error);
  }
};
