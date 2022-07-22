const express = require("express");
const app = express();
const dotRouter = require("./dotRoutes");

app.use("/dot", dotRouter);
app.get("/", (req, res) => {
    res.send("YEAAAAAH");
});

module.exports = app;
