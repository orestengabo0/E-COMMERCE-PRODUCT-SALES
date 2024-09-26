const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./Config/db.js");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 4000;

console.log(process.env.MONGO_URI);

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
});
