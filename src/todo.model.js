const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, default: null },
  isCompleted: { type: Boolean, default: false },
  created_ts: { type: String, default: Date.now },
  updated_ts: { type: String, default: null },
});

module.exports = mongoose.model("Todo", todoSchema);
