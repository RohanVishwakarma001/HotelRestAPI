const express = require("express");
const router = express.Router();

const MenuItem = require("../models/Menus");

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newMenu = new MenuItem(data);

    const response = await newMenu.save();

    console.log("Data saved");

    res.status(200).json(response);
  } catch (error) {
    res.status(500);

    console.log("Internal server error", error);
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Fetched Successful");

    res.status(200).json(data);
  } catch (error) {
    res.status(500);

    console.log("Internal server error", error);
  }
});

router.get("/:taste", async (req, res) => {
  try {
    const taste = req.params.taste;

    const data = await MenuItem.find({ taste: taste });

    console.log("Data Featched");

    res.status(200).json(data);
  } catch (error) {
    res.status(500);

    console.log("Internal server error", error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const updatedData = res.body;

    const response = await MenuItem.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      return res.status(404).json({ error: "Item not found" });
    }
    console.log("Data updated");
    res.status(200).json({ message: "data update successful" });
  } catch (error) {
    console.log("Internal server error", error);
    res.status(500);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await MenuItem.findByIdAndDelete(id);
    if (!response) {
      return res.status(404).json({ errer: "item not found" });
    }
    console.log("Data deleted");
    res.status(200).json({ message: "data deleted successful" });
  } catch (error) {
    console.log("Internal server error", error);
    res.status(500);
  }
});

module.exports = router;
