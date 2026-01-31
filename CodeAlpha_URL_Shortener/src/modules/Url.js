const express = require("express");
const router = express.Router();
const shortid = require("shortid");
const Url = require("../models/Url");

// POST: create short url
router.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ message: "URL is required" });
  }

  const shortCode = shortid.generate();

  const newUrl = new Url({
    originalUrl,
    shortCode
  });

  await newUrl.save();

  res.json({
    originalUrl,
    shortUrl: `http://localhost:5000/${shortCode}`
  });
});

module.exports = router;
