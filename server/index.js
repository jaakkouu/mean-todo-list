const express = require("express");
const app = express();
const cors = require("cors");
const { connect, getDatabase } = require("./repository/conn");
const port = 3000;

app.use(cors());

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
