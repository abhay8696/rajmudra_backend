const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.json("Request successfull");
});

module.exports = router;
