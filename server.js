const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const bp = require("body-parser");
require("dotenv/config");
const port = process.env.PORT || 5000;
const db = require("./config/db").MongoURI;
const userRouter = require("./routes/users");
const spendingsRouter = require("./routes/spendings");
const expenseRouter = require("./routes/expenses");
const incomesRouter = require("./routes/incomes");
// "mongodb://127.0.0.1:27017/userDB"
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log(err));
const app = express();
app.use(helmet());
app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use("/", userRouter);
app.use("/spendings", spendingsRouter);
app.use("/expenses", expenseRouter);
app.use("/incomes", incomesRouter);
app.listen(port, () => {
  console.log(`Server runnong at port ${port}`);
});
