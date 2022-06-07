const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema(
  {
    // _id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    // _id: { unique: true, type: String },
    body: {
      type: String,
      required: true,
    },
    author: { type: String, required: true },
    duration: { type: String },
    blog_image: { type: String, required: true },
    blog_id: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("blog", blogSchema);
