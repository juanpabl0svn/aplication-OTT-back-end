const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const router = require("./routes/router.js");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./database/root.js");

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use("/", router);
app.use(express.static(path.join(__dirname, "..", "public")));

app.listen(PORT, () => console.log(`Runing in http://localhost:${PORT}`));
