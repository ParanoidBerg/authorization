const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  text: String,
  completed: {
    type: Boolean,
    default: false,
  },
});

const Model = mongoose.model("Model", todoSchema);
module.exports = Model;
