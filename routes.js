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