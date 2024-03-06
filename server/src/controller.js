const mongoose = require("mongoose");
const Todo = require("./todo.model");
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const { validationResult } = require("express-validator");
// const jwt = require("jsonwebtoken");
// const jwtKey = process.env.JWT_KEY;

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ created_ts: -1 });
    return res.status(200).json({ err: null, data: [...todos] });
  } catch (e) {
    return res.status(200).json({ err: e.message, data: null });
  }
};
exports.saveTodo = async (req, res) => {
  try {
    let { title } = req.body;
    let todo = await Todo.findOne({ title });
    if(todo) return res.status(200).json({ err: "Todo with same title, already exist", data: null });
    todo = new Todo({ _id: new mongoose.Types.ObjectId() ,title });
    todo = await todo.save();
    return res.status(200).json({ err: null, data: todo });
  } catch (e) {
    return res.status(200).json({ err: e.message, data: null });
  }
};
exports.getTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    return res.status(200).json({ err: null, data: todo });
  } catch (e) {
    return res.status(200).json({ err: e.message, data: null });
  }
};
exports.updateTodo = async (req, res) => {
  try {
    let { id } = req.params;
    let { title, isCompleted } = req.body;
    let todo = await Todo.findById(id);
    if(!todo) return res.status(200).json({ err: "Todo Doesn't exist", data: null });
    let existing_todo = await Todo.findOne({ title, _id: { $ne: id } });
    if(existing_todo) res.status(200).json({ err: "Todo with same title, already exist", data: null, existing_todo });
    
    todo.title = title ? title : todo.title;
    todo.isCompleted = isCompleted ? isCompleted : todo.isCompleted;
    todo = await todo.save();
    
    return res.status(200).json({ err: null, data: { ...todo._doc, title } });
  } catch (e) {
    return res.status(200).json({ err: e.message, data: null });
  }
};
exports.deleteTodo = async (req, res) => {
  try {
    let { id } = req.params;
    let todo = await Todo.findById(id);
    if(!todo) return res.status(200).json({ err: "Todo Doesn't exist", data: null });
    let deleted_todo = await Todo.deleteOne({ _id: id });
    return res.status(200).json({ err: null, data: todo, deleted_todo });
  } catch (e) {
    return res.status(200).json({ err: e.message, data: null });
  }
};