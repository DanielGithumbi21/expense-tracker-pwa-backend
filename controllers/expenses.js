const Expenses = require("../models/expenses");

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expenses.find({ user: req.params.id });
    if (!expenses) {
      return res
        .status(400)
        .json({ Error: "You do not have any expenses now" });
    } else {
      return res.status(200).json(expenses);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getSingleExpense = async (req, res) => {
  try {
    Expenses.findOne({ _id: req.params.id })
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

exports.createExpense = async (req, res) => {
  try {
    let { name, transactionDate, description, amount, user } = req.body;

    const expense = await Expenses.create({
      name,
      transactionDate,
      description,
      amount,
      user,
    });
    res.status(201).json(expense);
  } catch (error) {
    console.log(error);
  }
};
