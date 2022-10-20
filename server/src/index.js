const express = require("express");
const mongoose = require("mongoose");
const MessageModel = require("./MessageModel");

process.on("SIGINT", () => {
  console.log("Caught interrupt signal");
  process.exit();
});

process.on("SIGTERM", () => {
  console.log("Caught interrupt signal");
  process.exit();
});

(async () => {
  const app = express();

  console.log("Connecting to MongoDB");
  await mongoose
    .connect(process.env.URL_MONGO, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log("connected"));

  app.get("/", (req, res) => {
    console.log("Got a request");
    res.json({ message: "Hey, I'm Tom, the API" });
  });

  app.post("/", async (req, res) => {
    console.log("Got a post");
    const message = new MessageModel({ sentence: "Hey I'm a new post!" });
    const result = await message.save();
    res.json({ message: "Hey, I saved a post", result });
  });

  app.listen(5000, () => {
    console.log("Server is running");
  });
})();
