const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  name: { type: String },
  phoneNumber: { type: String },
  phone: { type: String },
  service: { type: String },
  subject: { type: String },
  email: { type: String },
});
module.exports = mongoose.model("website_leads", Schema);
