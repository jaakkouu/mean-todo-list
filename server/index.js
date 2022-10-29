const express = require("express");
const app = express();
const cors = require("cors");
const { connect, getDatabase } = require("./repository/conn");
const port = 3000;
const bodyParser = require("body-parser");
const { ObjectId } = require("mongodb");

app.use(cors());
app.use(bodyParser.json());

connect();

app.get("/todos", (req, res) => {
  getDatabase()
    .collection("todos")
    .find()
    .toArray((err, result) => {
      if (err) {
        res.status(400).send("Error while fetching todos");
      } else {
        res.json(result);
      }
    });
});

app.post("/todo", (req, res) => {
  const { name } = req.body;
  const todo = {
    name,
  };

  getDatabase()
    .collection("todos")
    .insertOne(todo, function (err, result) {
      if (err) {
        res.status(400).send("Error inserting todo!");
      } else {
        res.status(204).send();
      }
    });
});

app.delete("/todo/:id", (req, res) => {
  const { id } = req.params;

  const todo = {
    _id: ObjectId(id),
  };

  getDatabase()
    .collection("todos")
    .deleteOne(todo, function (err, result) {
      if (err) {
        res.status(400).send("Error deleting todo!");
      } else {
        res.status(204).send();
      }
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
