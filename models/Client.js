const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: Number },
    email: { type: String, required: true },
    password: { type: String, required: true },
    client_type: { type: String, default: ["individual", "company"] },
    isAdmin: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    isFreelancer: { type: Boolean, default: false },
    isClient: { type: Boolean, default: false },
    gigs_posted: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Gig",
      },
    ],
    request_approved: [{ type: mongoose.Types.ObjectId, ref: "Gig" }],

    ratings: { type: Number, default: 0 },
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
    lastLogin: { type: Date, default: Date.now() },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Client", UserSchema);
