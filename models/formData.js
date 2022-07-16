const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  work_mode: { type: String },
  work_method: { type: String },
  address: { type: String },
  resume_link: { type: String },
  skills: { type: [String] },
  gender: { type: String },
  location: { type: String },
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
  registered: { type: Boolean, default: false },
});
module.exports = mongoose.model("freelancerformData", Schema);
