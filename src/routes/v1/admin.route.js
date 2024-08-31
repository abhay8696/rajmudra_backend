const express = require("express");
const { adminController } = require("../../controllers");

const router = express.Router();

router.post("/new", adminController.createAdmin);
router.get("/contact", adminController.getAdminByContact);
router.get("/:id", adminController.getAdminById);
module.exports = router;
