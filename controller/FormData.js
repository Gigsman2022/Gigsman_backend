const FormData = require("../models/formData");
module.exports.CreateformData = async (req, res, next) => {
  try {
    const findIfExists = await FormData.findOne({ email: req.body.email });
    if (findIfExists) {
      return res.json({ error: true, message: "Email Already Registered!" });
    }
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
    console.log(req.body);
    const updateData = await FormData.findByIdAndUpdate(
      { _id: req.body._id },
      {
        $set: {
          name: req.body.name,
          P: req.body.P,
          Q: req.body.Q,
          work_method: req.body.work_method,
          work_mode: req.body.work_mode,
          skills: req.body.skills,
        },
      },
      { new: true }
    );
    if (updateData) {
      res.json({ error: false, message: "Updated!" });
    } else {
      res.status(501).json({ error: true, message: updateData });
    }
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
            work_method: {
              $regex: work_method,
            },
          },
          {
            $or: [
              {
                skills: {
                  $in: skills,
                },
              },
              {
                address: {
                  $regex: address,
                },
              },
              {
                name: {
                  $regex: name,
                },
              },
              {
                email: {
                  $regex: email,
                },
              },
              {
                gender: gender,
              },
            ],
          },
          {
            work_mode: {
              $regex: work_mode,
            },
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
        registered: 1,
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
    console.log(req.params.email);
    const findIfExists = await FormData({ email: req.params.email });
    if (findIfExists) {
      const formData = await FormData.findOneAndDelete({
        email: req.params.email,
      });
      if (formData) {
        res.json({
          error: false,
          message: "Request Deleted!" + req.params.email,
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
