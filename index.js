const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

require("./models/User");
require("./services/passport");
const dbUser = process.env.MONGO_USER;
const dbPassword = process.env.MONGO_PASSWORD;
const mongURI = "mongodb://localhost/emaily-dev";

mongoose
  .connect(mongURI)
  .then(() => console.log("connected to mongodb..."))
  .catch((err) => console.log("connecting to mongodb failed", err));

const app = express();
require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
