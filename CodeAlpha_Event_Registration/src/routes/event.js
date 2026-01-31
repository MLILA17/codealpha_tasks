const express = require('express');
const Event = require('../models/Event');

const router = express.Router();

// CREATE EVENT (Organizer/Admin)
router.post('/', async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.json(event);
});

// GET ALL EVENTS
router.get('/', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// GET EVENT DETAILS
router.get('/:id', async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.json(event);
});

module.exports = router;
