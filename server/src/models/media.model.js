const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  caption: { type: String, required: true, unique: true },
  file: { type: Object, required: true },
  created_ts: { type: String, default: Date.now },
  updated_ts: { type: String, default: null },
});

module.exports = mongoose.model("Media", mediaSchema);
