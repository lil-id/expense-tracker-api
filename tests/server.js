const express = require("express");
const cors = require("cors");
const routes = require("../routes");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000; //

//const userRoute = require('./routes/user');

// parse application/json
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



// ROUTES API
routes(app);

module.exports = app