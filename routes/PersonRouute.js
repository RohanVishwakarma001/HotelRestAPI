const express = require("express");
const router = express.Router();

const Person = require("../models/person");

// Routes

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newPerson = new Person(data);

    const response = await newPerson.save();

    res.status(200).json(response);
  } catch (error) {
    res.status(500);
    console.log("Internal server error", error);
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();

    console.log("Fetched Successful");

    res.status(200).json(data);
  } catch (error) {
    res.status(500);

    console.log("Internal server error", error);
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (
      workType == "chef" ||
      workType == "owner" ||
      workType == "manager" ||
      workType == "waiter"
    ) {
      const data = await Person.find({ work: workType });

      console.log("Data Featched");

      res.status(200).json(data);
    } else {
      res.status(404).json({
        message: "Not found",
      });
    }
  } catch (error) {
    res.status(500);

    console.log("Internal server error", error);
  }
});

router.put("/:userName", async (req, res) => {
  try {
    const userName = req.params.userName;

    const updatedData = req.body;

    const response = await Person.findByIdAndUpdate(userName, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data updated");

    res.status(200).json(response);
  } catch (error) {
    res.status(500);

    console.log("Internal server error", error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const response = await Person.findByIdAndDelete(id);

    if (!response) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("user deleted ");
    res.status(200).json({ message: "user deleted successful" });
  } catch (error) {
    res.status(500);

    console.log("Internal server error", error);
  }
});

module.exports = router;
