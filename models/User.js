const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: Number },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    isFreelancer: { type: Boolean, default: false },
    isClient: { type: Boolean, default: false },
    provider_pic: { type: String, default: "" },
    token: { type: String },
    gigs_applied: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Gig",
      },
    ],
    requests_approved: [{ type: mongoose.Types.ObjectId, ref: "Gig" }],

    friends_list: [{ type: mongoose.Types.ObjectId, ref: "User" }],
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

module.exports = mongoose.model("User", UserSchema);
