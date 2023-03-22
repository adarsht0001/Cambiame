const express = require("express");
require("dotenv").config();

const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
const Database = require("./src/database");
const Routes = require("./src/routes");

app.use(cors());
app.options("*", cors());

app.use(bodyParser.json());

app.use(express.json());

app.use("/", Routes());

new Database(process.env.DATABASE_CONNECTION)
  .then(() =>
    app.listen(5000, () => {
      console.log("server started on http://localhost:5000/");
    })
  )
  .catch((err) => {
    console.log("error connecting database");
    console.log(err);
  });
