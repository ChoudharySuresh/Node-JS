const express = require("express");
const router = express.Router();

const Person = require("../models/Person");

const { jwtAuthMiddleWare, generateToken } = require("../jwt");

// POST route to add a person
router.post("/signup", async (req, res) => {
  try {
    const data = req.body; // Assuming the request body contains person data

    // Create a new Person document using mongoose model
    const newPerson = new Person(data);

    // Save the newPerson to the database
    const response = await newPerson.save();
    console.log("Data saved Successfully", response);

    const payload = {
      id: response.id,
      username: response.username,
    };
    const token = generateToken(payload);
    console.log("Token is", token);
    res.status(200).json({ response: response, token: token });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    // Extract the username and password from request body
    const { username, password } = req.body;

    const user = await Person.findOne({ username: username });

    // if user does not exist or password does not match , retrun error
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Generate token
    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = generateToken(payload);

    // return token as response
    res.json({ token });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Profile Route
router.get("/profile", jwtAuthMiddleWare, async (req, res) => {
  try {
    const userData = req.user;
    console.log("UserData ", userData);
    const userId = userData.id;

    const user = await Person.findById(userId);
    res.status(200).json({ user });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET Method to get the person
router.get("/", jwtAuthMiddleWare, async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data Fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Paramterised Api Call
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("Response Fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid Work Type" });
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Operation
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // Extract the Id from URl Parameter
    const updatedPersonData = req.body; // Updated data for the person

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, // return the updated the document
        runValidators: true, // run mongoose valiation
      }
    );

    if (!response) {
      return res.status(404).json({ error: "Perosn Not Found" });
    }
    console.log("Data Updated");
    res.status(200).json(response);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete Operation
router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // Extract the Id from URl Parameter

    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(404).json({ error: "Perosn Not Found" });
    }

    console.log("Data is Deleted");
    res.status(200).json({ message: "Person  deleted successfully" });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
