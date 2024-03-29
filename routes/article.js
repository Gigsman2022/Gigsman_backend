const router = require("express").Router();
const Controller = require("../controller/article");
const isAuth = require("../middlewares/isAuth");
const multipart = require("connect-multiparty");
const multipartWare = multipart();

router.get("/article", Controller.getAll);
router.post("/article", isAuth, multipartWare, Controller.addArticle);
router.post("/article/clap", Controller.clapArticle);
router.post("/article/comment", Controller.clapArticle);
router.get("/article/:id", Controller.getArticle);

module.exports = router;
