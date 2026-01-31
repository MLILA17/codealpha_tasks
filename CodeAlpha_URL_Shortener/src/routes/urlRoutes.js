const express = require("express");
const shortid = require("shortid");
const Url = require("../models/Url");

const router = express.Router();

/**
 * POST /shorten
 * body: { "originalUrl": "https://google.com" }
 */
router.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: "originalUrl is required" });
  }

  try {
    const shortCode = shortid.generate();

    const url = new Url({
      originalUrl,
      shortCode
    });

    await url.save();

    res.json({
      originalUrl,
      shortUrl: `${process.env.BASE_URL}/${shortCode}`
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * GET /:shortCode
 * redirect to original url
 */
router.get("/:shortCode", async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortCode });

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
