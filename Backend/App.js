const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./Config/db.js");
const path = require("path");
const userRoute = require("./Routes/user.router.js");
const loginRoute = require("./Routes/login.router.js");
const adminRouter = require("./Routes/admin.router.js");

dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json())
app.use('/auth/user', userRoute)
app.use('/auth/admin', adminRouter)
app.use('/auth/login', loginRoute)
app.use('/auth/admin', adminRouter)
app.use('/auth/admin', adminRouter)

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
});
