const express = require("express");
const taskRouter = express.Router();
const {
  createTask,
  getAllTasks,
  updateTask,
  getOneTask,
  deleteTask,
  toggleTask,
} = require("../controllers/taskController");

taskRouter.route("/").post(createTask).get(getAllTasks);
taskRouter.route("/:id").get(getOneTask).put(updateTask).delete(deleteTask).patch(toggleTask);

module.exports = taskRouter;
