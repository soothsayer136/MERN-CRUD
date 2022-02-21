const mongoose = require("mongoose");
const Task = mongoose.model("Task", {
  sn: {
    type: Number,
  },
  date: {
    type: Date,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    Default: "Completed",
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = Task;
