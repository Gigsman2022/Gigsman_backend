const FormData = require("../models/websiteLeads");
module.exports.CreateformData = async (req, res, next) => {
  try {
    console.log("arrived", req.body);
    const Createdata = await FormData(req.body);
    await Createdata.save();
    console.log("CreateData", Createdata);
    res.json({ error: false, message: Createdata });
  } catch {
    (err) => {
      console.log("Error IN FormData", err.message);
      res.json({ error: true, message: err.message });
    };
  }
};
module.exports.UpdateformData = async (req, res, next) => {
  try {
    // console.log(req.body);
    const updateData = await FormData.findByIdAndUpdate(
      req.body._id,
      {
        $set: { status: req.body.status },
      },
      { new: true }
    );
    console.log(updateData);
  } catch {
    (err) => {
      console.log("Error IN FormData", err.message);
      res.json({ error: true, message: err.message });
    };
  }
};
module.exports.GetformData = async (req, res, next) => {
  try {
    const formData = await FormData.find();
    if (formData) {
      res.json({ error: false, message: formData });
    } else {
      res.json({ error: true, message: "No Data Available!" });
    }
  } catch {
    (err) => {
      console.log("Error IN FormData", err.message);
      res.json({ error: true, message: err.message });
    };
  }
};
module.exports.FilterformData = async (req, res, next) => {
  try {
    const {
      name,
      gender,
      email,
      address,
      work_mode,
      work_method,
      resume_link,
      skills,
      phoneNumber,
      location,
    } = req.query;
    console.log(
      "name",
      name,
      "gender",
      gender,
      "email",
      email,
      "address",
      address,
      "work_mode",
      work_mode,
      "work_method",
      work_method,
      "resume_link",
      resume_link,
      "skills",
      skills,
      "phoneNumber",
      phoneNumber,
      "location",
      location
    );
    const formData = await FormData.find(
      {
        $and: [
          {
            gender:
              gender == "all" || gender == undefined ? { $ne: gender } : gender,
          },
          { skills: { $in: skills } },
          {
            $or: [
              { name: { $regex: name } },
              { email: { $regex: email } },

              { work_method: { $regex: work_method } },
              { work_mode: { $regex: work_mode } },
              { address: { $regex: address } },
            ],
          },
        ],
      },
      {
        skills: 1,
        name: 1,
        phoneNumber: 1,
        email: 1,
        location: 1,
        address: 1,
        resume_link: 1,
        work_method: 1,
        work_mode: 1,
        gender: 1,
      }
    );
    if (formData) {
      console.log(formData);
      res.json({ error: false, message: formData });
    } else {
      res.json({ error: true, message: "No Data Available!" });
    }
  } catch {
    (err) => {
      console.log("Error IN FormData", err.message);
      res.json({ error: true, message: err.message });
    };
  }
};
module.exports.DeleteformData = async (req, res, next) => {
  try {
    // console.log(req.params._id);
    const findIfExists = await FormData({ _id: req.params._id });
    if (findIfExists) {
      const formData = await FormData.findOneAndDelete({
        _id: req.params._id,
      });
      if (formData) {
        res.json({
          error: false,
          message: FormData.find(),
        });
      }
    }
  } catch {
    (err) => {
      console.log("Error In FormData", err.message);
      res.json({ error: true, message: err.message });
    };
  }
};
module.exports.RegisterFormData = async (req, res, next) => {
  try {
    const findIfExists = await FormData({ email: req.body.email });
    if (findIfExists) {
      const data = await FormData.findOneAndUpdate(
        { email: req.body.email },
        {
          $set: {
            registered: true,
          },
        },
        {
          new: true,
        }
      );
      if (data) {
        res.json({ error: true, message: "Registered!" + req.body.email });
      }
    }
  } catch {
    (err) => {
      console.log("Error IN FormData", err.message);
      res.json({ error: true, message: err.message });
    };
  }
};
