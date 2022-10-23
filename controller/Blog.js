const blogSchema = require("../models/Blog");
module.exports.createBlog = async (req, res, next) => {
  try {
    const { title, body, category, blog_id, author, blog_image } = req.body;
    // console.log(req.files.location);
    console.log("req.body", req.body);
    if (title && body && category && author) {
      console.log("IN IF");
      const checkIdExists = await blogSchema.findOne({ blog_id });
      console.log("checked", checkIdExists);
      if (checkIdExists == null) {
        console.log("creating");
        const createblog = await blogSchema({
          title,
          body,
          blog_id,
          category,
          author,
          blog_image,
        });

        await createblog.save();
        console.log("Blog saved!", createblog);
        return res.status(200).json({ error: false, message: createblog });
      } else {
        return res
          .status(409)
          .json({ error: true, message: "Please Use Unique Id!" });
      }
    } else {
      return res
        .status(204)
        .json({ error: true, message: "Please Add All Required Fields!" });
    }
  } catch {
    (err) => {
      console.log(err);
      return res.status(504).json({ error: true, message: err.message });
    };
  }
};
module.exports.GetAllBlogs = async (req, res, next) => {
  try {
    const getAllBlogs = await blogSchema
      .find()
      .select("blog_id blog_image category title createdAt");
    if (getAllBlogs) {
      return res.json({ error: false, message: getAllBlogs });
    } else {
      return res.status(404).json({ error: true, message: "No Blogs Found!" });
    }
  } catch {
    (err) => {
      console.log(err.message);
      return res.status(422).json({
        error: true,
        message: err.message,
      });
    };
  }
};
module.exports.GetBlogById = async (req, res, next) => {
  try {
    const { blog_id } = req.params;
    const getBlogById = await blogSchema.findOne({ blog_id });
    if (blog_id) {
      if (getBlogById) {
        return res.json({ error: false, message: getBlogById });
      } else {
        return res
          .status(422)
          .json({ error: true, message: "No blog Found with this Id!" });
      }
    } else {
      return res
        .status(422)
        .json({ error: true, message: "Please Enter Blog Id!" });
    }
  } catch {
    (err) => {
      console.log(err.message);
      return res.status(422).json({
        error: true,
        message: err.message,
      });
    };
  }
};
module.exports.UpdateBlogById = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const { title, body, category, author, duration } = req.body;
    if (!title) {
      return res
        .status(404)
        .json({ error: true, message: "Please Enter Title of the Blog!" });
    }
    if (!body) {
      return res
        .status(404)
        .json({ error: true, message: "Please Enter TitBodyle of the Blog!" });
    }
    if (title && body) {
      const updateBlog = await blogSchema.findByIdAndUpdate(
        { _id },
        {
          $set: {
            title,
            body,
            category,
            author,
          },
        },
        { new: true }
      );
      return res.json({ error: false, message: "Blog Updated Successfully!" });
    } else {
      return res
        .status(422)
        .json({ error: true, message: "Please Enter Required Fields!" });
    }
  } catch {
    (err) => {
      console.log(err.message);
      return res.status(422).json({
        error: true,
        message: err.message,
      });
    };
  }
};
module.exports.DeleteBlogById = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const deleteBlog = await blogSchema.findByIdAndDelete({ _id });
    if (deleteBlog) {
      return res.json({ error: false, message: `Blog Deleted with Id:${_id}` });
    } else {
      return res
        .status(402)
        .json({ error: true, message: `Cannot Find Blog with Id:${_id}` });
    }
  } catch {
    (err) => {
      console.log(err.message);
      return res.status(422).json({
        error: true,
        message: err.message,
      });
    };
  }
};
