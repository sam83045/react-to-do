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
 * POST /todo/create/
 */
app.post("/todo/create", (req, res) => {
  const { data } = req.body;
  const id = uuid();

  const todoList = [data, ...getDbData()];

  const dbData = JSON.stringify(todoList);
  fs.writeFileSync("./todo.json", dbData);

  return res.status(201).json({
    data: { todoList },
    message: "Resource created"
  });
});

/**
 * POST /todo/delete
 */
app.post("/todo/delete", (req, res) => {
  const { data } = req.body;
  const todoList = getDbData();

  const listAfterDeleion = todoList.reduce((newTodo, currentTodo) => {
    if (data.find(itemToRemove => itemToRemove === currentTodo.id)) {
      return newTodo;
    } else {
      return [...newTodo, currentTodo];
    }
  }, []);

  const dbData = JSON.stringify(listAfterDeleion);

  fs.writeFileSync("./todo.json", dbData);
  return res.status(200).json({
    message: "Updated successfully"
  });
});

/**
 * POST todo/update
 */
app.post("/todo/update", (req, res) => {
  const { data } = req.body;

  const todoList = getDbData();

  const indexOfTodo = todoList.findIndex(todo => todo.id === data.id);
  const updatedList = [...todoList.slice(0, indexOfTodo), data, ...todoList.slice(indexOfTodo + 1)];

  const dbData = JSON.stringify(updatedList);
  fs.writeFileSync("./todo.json", dbData);

  return res.status(201).json({
    message: "Resource Updated"
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