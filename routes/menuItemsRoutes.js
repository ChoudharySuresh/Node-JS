const express = require("express");
const router = express.Router();

const MenuItem = require("../models/MenuItem");

// POST route to add a Menu Item
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newMenu = new MenuItem(data);

    const response = await newMenu.save();
    console.log("Data saved Successfully", response);
    res.status(200).json(response);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET Method to get the Menu List
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Data Fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Paramterised Api Call based on tastes
router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType;
    if (tasteType == "sweet" || tasteType == "spicy" || tasteType == "sour") {
      const response = await MenuItem.find({ taste: tasteType });
      console.log("Response Fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid taste Type" });
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Operation
router.put("/:id", async (req, res) => {
  try {
    const menuId = req.params.id; // Extract the Id from URl Parameter
    const updatedMenuData = req.body; // Updated data for the person

    const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
      new: true, // return the updated the document
      runValidators: true, // run mongoose valiation
    });

    if (!response) {
      return res.status(404).json({ error: "Menu Item Not Found" });
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
    const menuId = req.params.id; // Extract the Id from URl Parameter

    const response = await MenuItem.findByIdAndDelete(menuId);

    if (!response) {
      return res.status(404).json({ error: "Menu Item Not Found" });
    }

    console.log("Data is Deleted");
    res.status(200).json({ message: "Menu Item deleted successfully" });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
