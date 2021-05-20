require("dotenv/config");

require("./db");

const express = require("express");
const path = require('path');
const app = express();

require("./config")(app);

const rules = require("./routes/rules");
app.use("/api/rules", rules)

const furnace = require("./routes/furnace");
app.use("/api/furnace", furnace);

const auth = require("./routes/auth");
app.use("/api/auth", auth)

app.use(express.static(path.join(__dirname, "/client/build")));

app.use((req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});



require("./error-handling")(app);

module.exports = app;
