const express = require("express");
const { adminController } = require("../../controllers");

const router = express.Router();

router.post("/new", adminController.createAdmin);
router.get("/all", adminController.getAllAdmins);
router.get("/contact", adminController.getAdminByContact);
router.get("/:id", adminController.getAdminById);
router.put("/:id", adminController.updateAdmin);
router.delete("/:id", adminController.deleteAdmin);
module.exports = router;
