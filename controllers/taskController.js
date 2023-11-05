const Task = require("../models/taskModel");
const mongoose = require("mongoose");

exports.createTask = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Task Name Required",
      });
    }
    //Create a new task
    const newTask = await Task.create({ name });
    return res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Task created successfully!",
      data: newTask,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "An error occured!",
      error: error.message,
    });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    //Get all tasks
    const allTasks = await Task.find();
    return res.status(200).send({
      success: true,
      statusCode: 201,
      message: `${allTasks.length} Task(s) retrieved!`,
      data: allTasks,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "An error occured!",
      error: error.message,
    });
  }
};

exports.getOneTask = async (req, res) => {
  try {
    //Get one tasks
    const { id } = req.params;
    if (!mongoose.isObjectIdOrHexString(id)) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: `Invalid ID: ${id}, passed!`,
      });
    }
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: `No task with this ID: ${id}, found!`,
      });
    }
    return res.status(200).send({
      success: true,
      statusCode: 200,
      message: `Task retrieved!`,
      data: task,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "An error occured!",
      error: error.message,
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { name, completed } = req.body;
    const { id } = req.params;
    if (!name) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Task Name Required",
      });
    }

    //Update new task
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { name, completed },
      { new: true, runValidators: true }
    );
    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "No task with this ID found!",
      });
    }
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Task Updated!",
      data: updatedTask,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "An error occured!",
      error: error.message,
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isObjectIdOrHexString(id)) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: `Invalid ID: ${id}, passed!`,
      });
    }
    const deleteTask = await Task.findByIdAndDelete(id);
    if (!deleteTask) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "No task with this ID found!",
      });
    }

    return res.status(200).json({
      success: true,
      statusCode: 204,
      message: "Task deleted!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "An error occured!",
      error: error.message,
    });
  }
};

exports.toggleTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "ID Required",
      });
    }

    //Toggle task Complete
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "No task with this ID found!",
      });
    }
    task.completed = !task.completed;
    await task.save();
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Task Completed!",
      completed: task.completed,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "An error occured!",
      error: error.message,
    });
  }
};
