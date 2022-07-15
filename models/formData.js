const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  work_mode: { type: String, required: true },
  work_method: { type: String, required: true },
  address: { type: String, required: true },
  resume_link: { type: String, required: true },
  skills: { type: [String], required: true },
  gender: { type: String, required: true },
  location: { type: String, required: true },
  services: [
    {
      services: { type: String },
      price: { type: String },
      portfolio_link: { type: String },
    },
    {
      default: {
        services: [""],
        price: "2000",
        portfolio_link: "https://www.gigzmann.com",
      },
    },
  ],
});
module.exports = mongoose.model("freelancerformData", Schema);
