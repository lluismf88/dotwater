const express = require("express");
const router = express.Router();
const dotController = require("../controllers/dotController");

router
    .get("/", dotController.getAllDots)
    .get("/:dotId", dotController.getOneDot)
    .post("/add", dotController.createNewDot)
    .post("/:dotId", dotController.updateOneDot)
    .get("/:dotId", dotController.deleteOneDot);

module.exports = router;
