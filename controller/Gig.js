const GigSchema = require("../models/Gig");
const UserSchema = require("../models/User");

module.exports.CreateGig = async (req, res, next) => {
  try {
    const {
      user,
      location,
      gig_name,
      pay,
      image,
      description,
      status,
      category,
    } = req.body;
    const userData = req.user;
    const updateUserData = await UserSchema.findById(userData._id);
    if (userData) {
      const createGig = new GigSchema({
        user: userData._id,
        location,
        gig_name,
        pay,
        image,
        description,
        status,
        category,
      });
      await createGig.save();
      updateUserData.gigs_posted = createGig._id;
      await updateUserData.save();

      res
        .status(201)
        .json({ success: true, message: "Gig created!!", data: createGig });
    } else {
      res.status(401).json({ error: "You are Not Authorized to Post Gig!!" });
    }
  } catch (error) {
    console.log("Error while creating the gig", error);
    res.status(422).json({ error });
  }
};
module.exports.GetGig = async (req, res, next) => {
  try {
  } catch (error) {
    console.log("Error while creating the gig", error);
    res.status(422).json({ error });
  }
};
module.exports.DeleteGig = async (req, res, next) => {
  try {
  } catch (error) {
    console.log("Error while creating the gig", error);
    res.status(422).json({ error });
  }
};
module.exports.UpdateGig = async (req, res, next) => {
  try {
  } catch (error) {
    console.log("Error while creating the gig", error);
    res.status(422).json({ error });
  }
};
