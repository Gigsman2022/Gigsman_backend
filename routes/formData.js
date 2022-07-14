const router = require("express").Router();
const formDataController = require("../controller/FormData");
const isAuth = require("../middlewares/isAuth");
router.post("/create-formData", formDataController.CreateformData);
router.put("/update-formData", formDataController.UpdateformData);
router.get("/get-formData", isAuth, formDataController.GetformData);
router.delete("/delete-formData", isAuth, formDataController.DeleteformData);

module.exports = router;
