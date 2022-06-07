const router = require("express").Router();
const GigController = require("../controller/Gig");
const isAuth = require("../middlewares/isAuth");
router.post("/create-gig", GigController.CreateGig);
router.put("/update-gig", GigController.UpdateGig);
router.get("/get-gig", isAuth, GigController.GetGig);
router.delete("/delete-gig", isAuth, GigController.DeleteGig);

module.exports = router;
