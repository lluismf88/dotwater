const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

const router = require("./routes");

var corsOptions = {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);

app.listen(PORT, () => {
    console.log("Server listening...\n");
    console.log(`http://localhost:${PORT}`);
});
