const express = require("express");
const cors = require("cors");
const routes = require("../routes");
const bodyParser = require("body-parser");
const response = require("../helpers/response")

const app = express();

// parse application/json
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    res.status(200).send({
        status: true,
        message: "Welcome to Money Tracker API"
    })
})

// ROUTES API
routes(app);

// app.use(response.errorHandler)
module.exports = app