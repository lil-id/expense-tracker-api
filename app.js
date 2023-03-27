const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8000; //

//const userRoute = require('./routes/user');

// parse application/json
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// Route
// app.use('/api/user', userRoute);

app.get("/", (req, res) => {
  res.send("<h1>Node.js TODO API PRISMA ORM</h1> <h4>Message: Success</h4><p>Version: 1.0</p>");
});

// ROUTES API
routes(app);
app.listen(port, () => {
  console.log("app berjalan dan terkonfigurasi port: " + port);
});
