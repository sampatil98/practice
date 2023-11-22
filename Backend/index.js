const express = require("express");

const cors = require("cors");

const { connection } = require("./config/db");
const { UserRouter } = require("./Router/user.route");
const { Jobrouter } = require("./Router/job.route");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("I am server😊");
});

app.use("/user", UserRouter);
app.use("/job", Jobrouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected to db at port 3000");
  } catch (error) {
    console.log(error);
    console.log("Not connected to db");
  }
});
