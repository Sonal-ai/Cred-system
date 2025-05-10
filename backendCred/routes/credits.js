const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Credits = mongoose.connection.collection("credits"); // Direct access to the collection

// 🟢 GET Total Credits
router.get("/", async (req, res) => {
  try {
    const creditsDoc = await Credits.findOne({ _id: "global_credits" }); // Fetch the single document
    res.json({ credits: creditsDoc ? creditsDoc.total : 0 });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch credits" });
  }
});

// 🟢 UPDATE Credits
router.post("/", async (req, res) => {
  try {
    const { amount } = req.body;

    // Update the document (if it doesn't exist, create it)
    const updatedDoc = await Credits.findOneAndUpdate(
      { _id: "global_credits" }, // Fixed ID document
      { $inc: { total: amount } }, // Increment total by amount
      { upsert: true, returnDocument: "after" } // Create if not exists
    );

    res.json({ credits: updatedDoc.total });
  } catch (error) {
    res.status(500).json({ error: "Failed to update credits" });
  }
});

module.exports = router;
