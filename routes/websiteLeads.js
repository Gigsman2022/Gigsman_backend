const router = require("express").Router();
const formDataController = require("../controller/WebsiteLeads");
const isAuth = require("../middlewares/isAuth");
router.post("/create-websiteLeads", formDataController.CreateformData);
router.post("/register-websiteLeads", formDataController.RegisterFormData);
router.put("/update-websiteLeads", formDataController.UpdateformData);
router.get("/get-websiteLeads", formDataController.GetformData);
router.get("/filter-websiteLeads", formDataController.FilterformData);
router.delete("/delete-websiteLeads/:email", formDataController.DeleteformData);

module.exports = router;
