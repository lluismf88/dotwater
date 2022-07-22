const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

const router = require("./routes");

app.use("/api", router);

app.listen(PORT, () => {
    console.log("Server listening...\n");
    console.log(`http://localhost:${PORT}`);
});
