const FormData = require("../models/formData");
module.exports.CreateformData = async (req, res, next) => {
  try {
    // console.log("create form", req.body);
    const Createdata = await FormData(req.body);
    await Createdata.save();
    console.log("CreateData", Createdata);
    res.send({ error: false, message: Createdata });
  } catch {
    (err) => {
      console.log("Error IN FormData", err.message);
      res.json({ error: true, message: err.message });
    };
  }
};
module.exports.UpdateformData = async (req, res, next) => {
  try {
  } catch {
    (err) => {
      console.log("Error IN FormData", err.message);
      res.json({ error: true, message: err.message });
    };
  }
};
module.exports.GetformData = async (req, res, next) => {
  try {
  } catch {
    (err) => {
      console.log("Error IN FormData", err.message);
      res.json({ error: true, message: err.message });
    };
  }
};
module.exports.DeleteformData = async (req, res, next) => {
  try {
  } catch {
    (err) => {
      console.log("Error IN FormData", err.message);
      res.json({ error: true, message: err.message });
    };
  }
};
