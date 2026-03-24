const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Schema
const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  message: { type: String, required: true },
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// API Routes
// Submit feedback
app.post('/api/feedback', async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    res.status(201).json({ success: true, message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Get approved feedback for display
app.get('/api/feedback', async (req, res) => {
  try {
    const approvedFeedback = await Feedback.find({ approved: true }).sort({ createdAt: -1 });
    res.json(approvedFeedback);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Admin routes
// Get all feedback
app.get('/api/admin/feedback', async (req, res) => {
  try {
    const allFeedback = await Feedback.find().sort({ createdAt: -1 });
    res.json(allFeedback);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Approve/Reject feedback
app.patch('/api/admin/feedback/:id', async (req, res) => {
  try {
    const { approved } = req.body;
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, { approved }, { new: true });
    res.json(feedback);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Delete feedback
app.delete('/api/admin/feedback/:id', async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Feedback deleted' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
