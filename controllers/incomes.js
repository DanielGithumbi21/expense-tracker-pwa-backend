const Incomes = require("../models/incomes");
const Spendings = require("../models/spendings");

exports.getAllIncomes = async (req, res) => {
  try {
    const currentUser = req.user;
    const incomes = await Incomes.find({ user: currentUser.id });
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
    const currentUser = req.user;
    let { name, transactionDate, description, amount, category } = req.body;

    const income = await Incomes.create({
      name,
      transactionDate,
      description,
      amount,
      category,
      user: currentUser.id,
    });
    res.status(201).json(income);
  } catch (error) {
    console.log(error);
  }
};
exports.getAggregateIncomes = async (req, res) => {
  try {
    const currentUser = req.user;
    Incomes.find({ user: currentUser.id }).then((result) => {
      let totalIncomes = 0;
      if (result.length === 0) {
        totalIncomes = 0;
      } else {
        totalIncomes = result.reduce((a, b) => {
          return a + b.amount;
        }, 0);
      }
      return res.status(200).json({ totalIncomes });
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getIncomesData = async (req, res) => {
  try {
    const currentUser = req.user;
    Incomes.find({ user: currentUser.id }).then((result) => {
      let incomes = Object.entries(
        result.reduce((acc, curr) => {
          if (!acc[curr.category]) {
            acc[curr.category] = curr.amount;
          } else {
            acc[curr.category] += curr.amount;
          }
          return acc;
        }, {})
      ).map(([category, amount]) => ({ category, amount }));
      return res.status(200).json(incomes);
    });
  } catch (error) {
    console.log(error);
  }
};
exports.getIncomeVsTargetedIncome = async (req, res) => {
  try {
    const currentUser = req.user;
    const incomes = Incomes.find({ user: currentUser.id });
    const spendings = Spendings.find({ user: currentUser.id });
    let incomesTotal = 0;
    if (incomes.length === 0) {
      incomesTotal = 0;
    } else {
      incomesTotal = await incomes.reduce((a, b) => {
        const total = a.amount + b.amount;
        return total;
      });
    }
    const spendingsTotal = (await spendings).map((spending) => {
      return spending.income || 0;
    });

    const targetedIncomeLessIncome = spendingsTotal - incomesTotal;

    return res.status(200).json({ targetedIncomeLessIncome });
  } catch (error) {
    console.log(error);
  }
};
