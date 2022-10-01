const router = require("express").Router();
const UserController = require("../controller/User");
const isAuth = require("../middlewares/isAuth");
router.post("/SignUp-user", UserController.SignUpUser);
router.post("/signIn-user", UserController.SignInUser);
router.get("/profile-user", isAuth, UserController.ProfileData);

module.exports = router;
