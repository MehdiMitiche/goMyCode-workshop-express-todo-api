//Importing dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//Initializing  the app
const app = express();

//Importing the Models
const Todo = require("./models/Todo");

//Connecting the database
mongoose.connect("mongodb://localhost/goMyCodeTodo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.once("open", () => {
  console.log("Database connected successfully !");
});

//Body-Parser MiddelWar
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Handeling our endpoints
app.get("/todos", (req, res) => {
  try {
    Todo.find().then((data, err) => {
      if (err) return res.status(400).json({ message: "Error" });
      return res.status(200).json({ data });
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/todos", (req, res) => {
  try {
    const newTodo = new Todo();
    if (!req.body.todo_text)
      return res
        .status(400)
        .json({ message: "todo_text is required to add a new Todo" });
    newTodo.body = req.body.todo_text;
    newTodo.save().then((data, err) => {
      if (err) return res.status(400).json({ message: "Error" });
      return res.status(200).json({ data });
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/todos", (req, res) => {
  if (!req.body.id || !req.body.todo_text)
    return res
      .status(400)
      .json({ message: "todo_text and id are required to update a Todo" });
  try {
    Todo.updateOne({ _id: req.body.id }, { body: req.body.todo_text }).then(
      (data, err) => {
        if (err) return res.status(400).json({ message: "Error" });
        return res
          .status(200)
          .json({ message: "Updated successfully !", data });
      }
    );
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/todos", (req, res) => {
  if (!req.body.id)
    return res.status(400).json({ message: "id is required to delete a Todo" });
  try {
    Todo.deleteOne({ _id: req.body.id }).then((data, err) => {
      if (err) return res.status(400).json({ message: "Error" });
      return res.status(200).json({ message: "Deleted successfully !", data });
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(8080, () => {
  console.log("API running in port 8080");
});
