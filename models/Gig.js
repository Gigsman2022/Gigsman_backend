const mongoose = require("mongoose");
const GigSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Types.ObjectId,
      default: "",
      required: true,
      ref: "Client",
    },
    gig_name: { type: String, default: "", required: true },
    requests_on_gig: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    location: {
      lat: {
        type: String,
        default: "48.8566",
      },
      lng: {
        type: String,
        default: "2.3522",
      },
      place: { type: String, default: "Paris" },
    },
    budget: { type: Number, default: 0 },
    image_title: [{ type: String, default: "" }],
    image: [{ type: String, default: "" }],
    description: { type: String, default: "" },
    status: { type: String, default: "" },
    category: [{ type: String, default: "All" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("gig", GigSchema);
