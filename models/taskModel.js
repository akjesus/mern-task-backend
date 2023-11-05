const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A Task must have a name"],
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
