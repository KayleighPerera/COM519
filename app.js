require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const chalk = require("chalk");
const bodyParser = require("body-parser");
const expressSession = require("express-session");


const { PORT, MONGODB_URI } = process.env;

/**
 * Controllers (route handlers).
 */
const driversController = require("./controllers/drivers");

const app = express();
app.set("view engine", "ejs");

app.listen(PORT, () => {
    console.log(
        `Example app listening at http://localhost:${PORT}`,
        chalk.green("✓")
    );
})


/***
 * We are applying our middlewear
 */
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/***
 * routes
 */

app.get("/", (req, res) => {
    res.render("index")
});

app.get("/createdriver", (req, res) => {
    res.render('createdriver', { errors: {} })
});

app.get("/index", (req, res) => {
    res.render('index', { errors: {} })
});

app.get("/alldrivers", (req, res) => {
    res.render('alldrivers', { errors: {} })
});

app.post("/createdriver", driversController.create);


/**connect to database */
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on("error", (err) => {
    console.error(err);
    console.log(
        "MongoDB connection error. Please make sure MongoDB is running.",
        chalk.red("✗")
    );
    process.exit();
});