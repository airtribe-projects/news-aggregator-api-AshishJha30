require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { logger } = require("./src/middlewares/logger");
const usersRouter = require("./src/routes/usersRoutes");
const newsRouter = require("./src/routes/newsRoutes");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(logger);

app.use("/users", usersRouter);
app.use("/news", newsRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the News Aggregator API" });
});

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log("Server started on port", PORT);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

module.exports = app; 
