<<<<<<< HEAD
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000; //
=======
const express = require('express');
const cors = require('cors')
const routes = require('./routes');
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 3000; // 
>>>>>>> f5341c4192b6c67eeb479248d06cd70afe0b3673

//const userRoute = require('./routes/user');

// parse application/json
<<<<<<< HEAD
app.use(cors());
=======
app.use(cors())
>>>>>>> f5341c4192b6c67eeb479248d06cd70afe0b3673
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





// ROUTES API
routes(app)


app.listen(port, () => {
  console.log("app berjalan dan terkonfigurasi port: " + port);
});
