const router = require("express").Router();
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

aws.config.update({
  secretAccessKey: `${process.env.AWS_SEC_S3}`, //`${process.env.AWS_SEC}`,
  accessKeyId: `${process.env.AWS_KEY_S3}`, //`${process.env.AWS_KEY}`,
  region: "ap-south-1",
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: "gigsman-blog-images",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.originalname });
    },

    key: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});
const Controller = require("../controller/Blog");
const isAuth = require("../middlewares/isAuth");
router.post(
  "/createBlog",
  upload.array("blog_image", 100),
  isAuth,
  Controller.createBlog
);
router.get("/getAllBlogs", Controller.GetAllBlogs);
router.get("/getBlog/:blog_id", Controller.GetBlogById);
router.put("/updateBlog/:_id", Controller.UpdateBlogById);
router.delete("/deleteBlog/:_id", Controller.DeleteBlogById);
module.exports = router;
