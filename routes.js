<<<<<<< HEAD
const UserController = require("./controllers/UserController");

const _routes = [
  // http://localhost:3000/api/user
  ["user", UserController],
];

const routes = (app) => {
  _routes.forEach((route) => {
    const [url, controller] = route;
    app.use(`/api/${url}`, controller);
  });
};

module.exports = routes;
=======
const IncomeController = require('./controllers/IncomeController')
const _routes = [ 
    // http://localhost:3000/api/income
    ['income', IncomeController],
]
const routes = (app) => {
    _routes.forEach( route =>{
        const [url, controller] = route
        // http://localhost:3000/api
        app.use(`/api/${url}`, controller)
    })
}
module.exports = routes
>>>>>>> f5341c4192b6c67eeb479248d06cd70afe0b3673
