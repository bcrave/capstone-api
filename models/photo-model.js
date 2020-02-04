const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Photo = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  thumb_image_url: {
    type: String,
    required: true
  },
  banner_image_url: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("photos", Photo);
