const express = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");
const app = express();
app.use(express.json({ limit: "10000mb", extended: true }));
app.use(express.urlencoded({ limit: "10000mb", extended: true }));
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
  const buf = randomBytes(12).toString("hex");

  const { title, img, description } = req.body;
  items.push({
    id: buf,
    title: title,
    img: img,
    description: description,
  });

  res.status(201).send(items);
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
