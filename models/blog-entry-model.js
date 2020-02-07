const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogEntry = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("blog-entries", BlogEntry);
