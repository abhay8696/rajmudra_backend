const express = require("express");
const { adminController } = require("../../controllers");
const validate = require("../../middlewares/validate");
const { adminValidation } = require("../../validations");

const router = express.Router();

router.post("/new", adminController.createAdmin);

router.get("/all", adminController.getAllAdmins);

router.get("/contact", adminController.getAdminByContact);

router.get(
    "/:id",
    validate(adminValidation.getAdmin),
    adminController.getAdminById
);

router.put(
    "/:id",
    validate(adminValidation.getAdmin),
    adminController.updateAdmin
);

router.delete("/:id", adminController.deleteAdmin);

module.exports = router;
