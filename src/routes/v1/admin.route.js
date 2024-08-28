const express = require("express");
const { getAdminByContact } = require("../../services/admin.service");

const router = express.Router();

router.get("/", async (req, res) => {
    const getAdmin = await getAdminByContact(req.body.contact);
    res.send(getAdmin);
});

module.exports = router;
