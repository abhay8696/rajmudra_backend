const express = require("express");
const validate = require("../../middlewares/validate");
const { shopController } = require("../../controllers");
const auth = require("../../middlewares/auth");
const { shopValidation } = require("../../validations/shop.validation");

const router = express.Router();

// Create a new shop
router.post("/new", auth, shopController.createShop);

// Get all shops
router.get("/all", auth, shopController.getAllShops);

// Get a specific shop by ID
router.get("/:id", auth, shopController.getShop);

// Update a specific shop by ID
router.put("/:id", auth, shopController.updateShop);

// Delete a specific shop by ID
router.delete("/:id", auth, shopController.deleteShop);

module.exports = router;
