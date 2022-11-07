const UserController = require("./controllers/UserController");
const IncomeController = require("./controllers/IncomeController");
const ExpenseController = require("./controllers/ExpenseController")
const AuthController = require("./controllers/AuthController");

const _routes = [
  // http://localhost:3000/api/user
  ["user", UserController],
  ["income", IncomeController],
  ["expense", ExpenseController]
  ["login", AuthController],
];

const routes = (app) => {
  _routes.forEach((route) => {
    const [url, controller] = route;
    app.use(`/api/${url}`, controller);
  });
};

module.exports = routes;
