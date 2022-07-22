const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Let's goooo");
});

module.exports = router;
