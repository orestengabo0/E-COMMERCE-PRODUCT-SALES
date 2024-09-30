const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./Config/db.js");
const path = require("path");
const userRoute = require("./Routes/user.router.js");

dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json())
app.use('/api/auth', userRoute)
app.use('/api/auth', userRoute)
app.use('/api/auth/permissions', userRoute)

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
});
