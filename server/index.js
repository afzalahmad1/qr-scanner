const express = require("express");
const scannerRoutes = require("./routes/scanner")
const cors = require("cors")
require("dotenv").config();
const bodyParser = require('body-parser')
const RegistrationRoute = require('./routes/signup')


const app = express();
const PORT = process.env.PORT  || 6001;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());

app.use("/user", RegistrationRoute);
app.use("/api", scannerRoutes)


app.listen(PORT, () => {
    console.log("Server is running at port", PORT);
  });