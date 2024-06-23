const express = require("express");
const router = express.Router();

const Person = require("../models/Person");

// POST route to add a person
router.post("/", async (req, res) => {
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
router.get("/", async (req, res) => {
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
