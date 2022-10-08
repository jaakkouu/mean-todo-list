const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

app.use(cors());

app.get("/todos", (req, res) => {
  const randomNumber = Math.floor(Math.random() * 10) + 1;
  const data = Array.from(Array(randomNumber), (_, index) => ({
    name: `Todo ${index + 1}`,
  }));
  res.send(data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
