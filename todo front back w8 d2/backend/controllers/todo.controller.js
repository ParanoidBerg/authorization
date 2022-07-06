const Todo = require("../models/Todo.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.todoController = {
  postTodo: async (req, res) => {
    try {
      const data = await Todo.create({
        user: req.user.id,
        text: req.body.text,
      });
      res.json(data);
    } catch (err) {
      return res.status(401).json(`Ошибка: ${err.message}`);
    }
  },

  delTodo: async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      if (todo.user.toString() === req.user.id) {
        await todo.remove();
        return res.json("task is deleted");
      }
      return res.status(401).json({ error: "У вас нет доступа" });
    } catch (err) {
      return res.status(401).json(`Ошибка: ${err.message}`);
    }
  },

  getTodo: async (req, res) => {
    try {
      const task = await Todo.find();
      return res.json(task);
    } catch (err) {
      res.json({ error: err.message });
    }
  },
  patchTodo: async (req, res) => {
    try {
      const data = await Todo.findByIdAndUpdate(
        req.params.id,
        {
          completed: req.body.completed,
        },
        { new: true }
      );

      res.json(data);
    } catch (err) {
      res.json(err);
    }
  },
};
