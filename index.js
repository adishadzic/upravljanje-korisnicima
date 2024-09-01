const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const { 
    v1: uuidv1,
  } = require('uuid');

const app = express();
const PORT = 3000;
const db = "db.json";

app.use(cors());
app.use(bodyParser.json());

app.use(express.static("client"));

const readDB = () => {
  const data = fs.readFileSync(db);
  return JSON.parse(data);
};

const writeDB = (data) => {
  fs.writeFileSync(db, JSON.stringify(data, null, 2));
};

app.get("/users", (req, res) => {
  const db = readDB();
  res.json(db.users);
});

app.post("/users", (req, res) => {
  const db = readDB();
  const newUser = {
    id: uuidv1(),
    ...req.body,
  };

  db.users.push(newUser);
  writeDB(db);
  res.status(201).json(newUser);
});

app.put("/users/:id", (req, res) => {
    const db = readDB();
    const userId = req.params.id; // Keep the ID as a string
    const userIndex = db.users.findIndex((user) => user.id === userId); // Compare IDs as strings
  
    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }
  
    db.users[userIndex] = { ...db.users[userIndex], ...req.body };
    writeDB(db);
    res.json(db.users[userIndex]);
  });

  app.delete("/users/:id", (req, res) => {
    const db = readDB();
    const userId = req.params.id; // Keep the ID as a string
    const userIndex = db.users.findIndex((user) => user.id === userId); // Compare IDs as strings
  
    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }
  
    db.users.splice(userIndex, 1);
    writeDB(db);
    res.status(204).send();
  });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
