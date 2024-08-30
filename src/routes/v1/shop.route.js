const express = require("express");
const validate = require("../../middlewares/validate");
const shopController = require("../../controllers/shop.controller");

const router = express.Router();

router.post("/new", shopController.createShop);
router.get("/all", shopController.getAllShops);
router.get("/:id", shopController.getShop);
router.put("/:id", shopController.updateShop);
router.delete("/:id", shopController.deleteShop);

module.exports = router;
