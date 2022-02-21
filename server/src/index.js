const express = require("express");
require("./db/mongoose");
const userRouter = require("./router/user");
const taskRouter = require("./router/task");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 5000;
// app.use(cookieParser());

app.use(
  cors({ origin: ["http://localhost:3000"], credentials: true, origin: true })
);

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server is running ${port}`);
});

const Task = require("./model/task");
const User = require("./model/user");
