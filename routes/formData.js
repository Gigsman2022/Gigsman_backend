const router = require("express").Router();
const formDataController = require("../controller/FormData");
const isAuth = require("../middlewares/isAuth");
router.post("/create-formData", formDataController.CreateformData);
router.post("/register-formData", formDataController.RegisterFormData);
router.put("/update-formData", formDataController.UpdateformData);
router.get("/get-formData", formDataController.GetformData);
router.get("/filter-formData", formDataController.FilterformData);
router.delete("/delete-formData", isAuth, formDataController.DeleteformData);

module.exports = router;
