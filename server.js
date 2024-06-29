const express = require("express");
const app = express();
const db = require("./db");
const Person = require("./models/Person");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
require("dotenv").config();
const passport = require("./auth");

// MiddleWare Function
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`
  );
  next(); // Move on to the Next Phase
};
app.use(logRequest);

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate("local", { session: false });

app.get("/", function (req, res) {
  res.send("Welcome to Our hotel");
});

// Import the router files
const personRoutes = require("./routes/perosnRoutes");
const menuItemsRoutes = require("./routes/menuItemsRoutes");

// Use the routers
app.use("/person", personRoutes);
app.use("/menu", menuItemsRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("listening on port 3000");
});
