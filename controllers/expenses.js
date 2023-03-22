const Expenses = require("../models/expenses");
const Spendings = require("../models/spendings");

exports.getAllExpenses = async (req, res) => {
  try {
    const currentUser = req.user;
    const expenses = await Expenses.find({ user: currentUser.id });
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
    const currentUser = req.user;
    let { name, transactionDate, description, amount, category } = req.body;

    const expense = await Expenses.create({
      name,
      transactionDate,
      description,
      amount,
      category,
      user: currentUser.id,
    });
    res.status(201).json(expense);
  } catch (error) {
    console.log(error);
  }
};

exports.getAggregateExpenses = async (req, res) => {
  try {
    const currentUser = req.user;
    Expenses.find({ user: currentUser.id }).then((result) => {
      let totalExpenses = 0;
      if (result.length === 0) {
        totalExpenses = 0;
      } else {
        totalExpenses = result.reduce((a, b) => {
          return a + b.amount;
        }, 0);
      }

      return res.status(200).json({ totalExpenses });
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getExpensesData = async (req, res) => {
  try {
    const currentUser = req.user;
    Expenses.find({ user: currentUser.id }).then((result) => {
      let expenses = Object.entries(
        result.reduce((acc, curr) => {
          if (!acc[curr.category]) {
            acc[curr.category] = curr.amount;
          } else {
            acc[curr.category] += curr.amount;
          }
          return acc;
        }, {})
      ).map(([category, amount]) => ({ category, amount }));
      return res.status(200).json(expenses);
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getExpenseVsBudget = async (req, res) => {
  try {
    const currentUser = req.user;
    const expenses = Expenses.find({ user: currentUser.id });
    const spendings = Spendings.find({ user: currentUser.id });

    let expensesTotal = 0;

    if ((await expenses).length === 0) {
      expensesTotal = 0;
    } else {
      expensesTotal = (await expenses).reduce((a, b) => {
        const total = a.amount + b.amount;
        return total;
      });
    }

    const spendingsTotal = (await spendings).map((spending) => {
      return spending.budget || 0;
    });

    const budgetLessExpense = spendingsTotal - expensesTotal;

    return res.status(200).json({ budgetLessExpense });
  } catch (error) {
    console.log(error);
  }
};
