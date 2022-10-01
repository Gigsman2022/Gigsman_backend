const router = require("express").Router();
const Controller = require("../controller/article");
const multipart = require("connect-multiparty");
const multipartWare = multipart();
const isAuth = require("../middlewares/isAuth");

router.get("/article", Controller.getAll);
router.post("/article", isAuth, multipartWare, Controller.addArticle);
router.post("/article/clap", Controller.clapArticle);
router.post("/article/comment", Controller.clapArticle);
router.get("/article/:id", Controller.getArticle);

module.exports = router;
