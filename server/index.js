const express = require("express");
const app = express();
const cors = require("cors");
const { connect, getDatabase } = require("./repository/conn");
const port = 3000;

app.use(cors());

connect();

app.get("/todos", (req, res) => {
  const todos = getDatabase()
    .collection("todos")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      console.log(result);
    });

  res.send(todos);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
