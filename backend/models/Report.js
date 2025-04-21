const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  lat: Number,
  lng: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', ReportSchema);
