//imports
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

//middlewares
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

//route imports
const userRoutes = require("./routes/userRoutes");

//routes
app.use("/api/user", userRoutes);

//db connection
mongoose
  .connect(process.env.DB_URL, {})
  .then(() => console.log("DB connection successful"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT || 5001, () => {
  console.log(`App listening on http://localhost:${process.env.PORT || 5001}`);
});
