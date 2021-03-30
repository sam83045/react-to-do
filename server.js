"use strict";
const express = require("express");
const app = require("express")();
const cors = require("cors");
const fs = require("file-system");
const bodyParser = require("body-parser");
const uuid = require("uuidv4");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

function getDbData() {
  const todo = fs.readFileSync("./todo.json");
  return JSON.parse(todo);
}

let baseUrl = "http://localhost";

/**
 * GET /todo
 *
 * Return the list of todo with status code 200.
 */
app.get(`/todo`, (req, res) => {
  const lists = getDbData();
  return res.status(200).json(lists);
});

/**
 * PUT /todo/update/
 */
app.put("/todo/update", (req, res) => {
  const { data, listName } = req.body;
  const todoListData = getDbData();
  const cardArr = todoListData[listName].cards;

  todoListData[listName].cards = cardArr.map(card => {
    if (card.id === data.id) {
      return data;
    }
    return card;
  });
  const todDdata = JSON.stringify(todoListData);
  fs.writeFileSync("./todo.json", todDdata);
  return res.status(201).json({
    message: "Resource created"
  });
});

/**
 * POST /todo/create/
 */
app.post("/todo/create", (req, res) => {
  const { listName, data } = req.body;
  const id = uuid();

  const todo = {
    id,
    ...data
  };
  const todoListData = getDbData();

  todoListData[listName].cards.push(todo);

  const dbData = JSON.stringify(todoListData);
  fs.writeFileSync("./todo.json", dbData);

  return res.status(201).json({
    data: { ...todo },
    message: "Resource created"
  });
});

/**
 * DELETE /todo/delete/:id
 */
app.delete("/todo/delete/:listName/:cardId", (req, res) => {
  const { listName, cardId } = req.params;
  const todoListData = getDbData();

  todoListData[listName].cards = todoListData[listName].cards.filter(
    card => card.id !== cardId
  );

  const dbData = JSON.stringify(todoListData);

  fs.writeFileSync("./todo.json", dbData);
  return res.status(200).json({
    message: "Updated successfully"
  });
});

/**
 * POST todo/updateLists
 */
app.post("/todo/updateLists", (req, res) => {
  const { lists } = req.body;
  const data = JSON.stringify(lists);

  fs.writeFileSync("./todo.json", data);

  return res.status(201).json({
    message: "Resource created"
  });
});

// Production mode settngs for Heroku
if (process.env.NODE_ENV === "production") {
  baseUrl = "todo-list.com";
  app.use(express.static("client/build"));
}
const PORT = process.env.PORT || 9001;
app.listen(PORT, () => {
  process.stdout.write(`the server is available on ${baseUrl}:${PORT}/\n`);
});