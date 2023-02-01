const Expenses = require("../models/expenses");
const Spendings = require("../models/spendings");

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

exports.getAggregateExpenses = async (req, res) => {
  try {
    Expenses.find({ user: req.params.id }).then((result) => {
      let totalExpenses = result.reduce((a, b) => {
        return {
          total: a.amount + b.amount,
        };
      });
      return res.status(200).json(totalExpenses);
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getExpensesData = async (req, res) => {
  try {
    Expenses.find({ user: req.params.id }).then((result) => {
      let expenses = result.map((expense) => {
        return {
          name: expense.name,
          amount: expense.amount,
        };
      });
      return res.status(200).json(expenses);
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getExpenseVsBudget = async (req, res) => {
  try {
    const expenses = Expenses.find({ user: req.params.id });
    const spendings = Spendings.find({ user: req.params.id });
    const expensesTotal = (await expenses).reduce((a, b) => {
      const total = a.amount + b.amount;
      return total;
    });
    const spendingsTotal = (await spendings).map((spending) => {
      return spending.budget;
    });

    const budgetLessExpense = spendingsTotal - expensesTotal;

    return res.status(200).json({ budgetLessExpense });
  } catch (error) {
    console.log(error);
  }
};
