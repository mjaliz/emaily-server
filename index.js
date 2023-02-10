const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

require("./models/User");
require("./services/passport");

const mongURI = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_DOCKER_PORT}/${process.env.MONGODB_DATABASE}?authSource=admin`;

mongoose
  .connect(mongURI)
  .then(() => console.log("connected to mongodb..."))
  .catch((err) => console.log("connecting to mongodb failed", err));

const app = express();
require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
