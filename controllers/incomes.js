const Incomes = require("../models/incomes");
const Spendings = require("../models/spendings");

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
exports.getAggregateIncomes = async (req, res) => {
  try {
    Incomes.find({ user: req.params.id }).then((result) => {
      let totalIncomes = result.reduce((a, b) => {
        return {
          total: a.amount + b.amount,
        };
      });
      return res.status(200).json(totalIncomes);
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getIncomesData = async (req, res) => {
  try {
    Incomes.find({ user: req.params.id }).then((result) => {
      let incomes = result.map((income) => {
        return {
          name: income.name,
          amount: income.amount,
        };
      });
      return res.status(200).json(incomes);
    });
  } catch (error) {
    console.log(error);
  }
};
exports.getIncomeVsTargetedIncome = async (req, res) => {
  try {
    const incomes = Incomes.find({ user: req.params.id });
    const spendings = Spendings.find({ user: req.params.id });
    const incomesTotal = (await incomes).reduce((a, b) => {
      const total = a.amount + b.amount;
      return total;
    });
    const spendingsTotal = (await spendings).map((spending) => {
      return spending.income;
    });

    const targetedIncomeLessIncome = spendingsTotal - incomesTotal;

    return res.status(200).json({ targetedIncomeLessIncome });
  } catch (error) {
    console.log(error);
  }
};
