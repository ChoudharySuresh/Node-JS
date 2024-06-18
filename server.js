const express = require("express");
const app = express();
const db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const Person = require("./models/Person");
const MenuItem = require("./models/MenuItem");

app.get("/", function (req, res) {
  res.send("Welcome to my hotel.. How can i help you? we have list of menus");
});

// POST route to add a person
app.post("/person", async (req, res) => {
  try {
    const data = req.body; // Assuming the request body contains person data

    // Create a new Person document using mongoose model
    const newPerson = new Person(data);

    // Save the newPerson to the database
    const response = await newPerson.save();
    console.log("Data saved Successfully", response);
    res.status(200).json(response);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// GET Method to get the person
app.get("/person", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data Fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST route to add a Menu Item
app.post("/menu", async (req, res) => {
  try {
    const data = req.body; // Assuming the request body contains person data

    // Create a new Person document using mongoose model
    const newMenu = new MenuItem(data);

    // Save the newPerson to the database
    const response = await newMenu.save();
    console.log("Data saved Successfully", response);
    res.status(200).json(response);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET Method to get the Menu List
app.get("/menu", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Data Fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
