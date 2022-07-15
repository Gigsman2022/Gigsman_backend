const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  service: { type: String, required: true },
});
module.exports = mongoose.model("website_leads", Schema);
