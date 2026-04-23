const express = require("express");
const app = express();
const PORT = 2025;

app.get("/", (req, res) => {
  res.send("Welcome to HomeWork API");
});

app.get("/Intro", (req, res) => {
  res.send("Im a fan of transportation and enjoy using AI");
});

app.get("/Name", (req, res) => {
  res.send("Ethan");
});

app.get("/Hobbies", (req, res) => {
  res.send("Cycling, exploring local places, playing simulation games");
});

app.get("/Food", (req, res) => {
  res.send("Fried chicken, fried rice, curry fish head, spaghetti");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});