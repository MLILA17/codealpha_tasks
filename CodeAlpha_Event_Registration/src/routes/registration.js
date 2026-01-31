const express = require('express');
const Registration = require('../models/Registration');

const router = express.Router();

// REGISTER FOR EVENT
router.post('/', async (req, res) => {
  const { userId, eventId } = req.body;

  const exists = await Registration.findOne({ user: userId, event: eventId });
  if (exists) {
    return res.status(400).json({ message: "Already registered" });
  }

  const registration = new Registration({ user: userId, event: eventId });
  await registration.save();

  res.json({ message: "Registered successfully" });
});

// VIEW USER REGISTRATIONS
router.get('/user/:id', async (req, res) => {
  const registrations = await Registration
    .find({ user: req.params.id })
    .populate('event');

  res.json(registrations);
});

// CANCEL REGISTRATION
router.delete('/:id', async (req, res) => {
  await Registration.findByIdAndDelete(req.params.id);
  res.json({ message: "Registration cancelled" });
});

module.exports = router;
