const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/memefy", () => {
  console.log("connected to mongoose");
});

app.use(cors());

app.use("/users", require("./routes/usersRoute"));
app.use("/image", require("./routes/imageUpload"));

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
