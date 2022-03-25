const express = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");
const app = express();

app.use(express.json());
app.use(cors());

let items = [];

app.get("/items", (req, res) => {
  console.log(items);
  res.send(items);
});

app.get("/items/:id", (req, res) => {
  const item = items.find((item) => item.id == req.params.id);
  res.send(item);
});

app.post("/items", (req, res) => {
  items.push(req.body);
  console.log(req.body);
  res.status(201).send(req.body);
});

app.delete("/items/:id", (req, res) => {
  const item = items.find((item) => item.id == req.params.id);
  const index = items.indexOf(item);
  items.splice(index, 1);
  res.status(200).send();
});
app.listen(3000, () => {
  console.log("localhost:3000");
});
