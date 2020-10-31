const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  body: {
    type: "string",
    required: "Todo body is required",
  },
});

const Todo = mongoose.model("todo", TodoSchema);
module.exports = Todo;
