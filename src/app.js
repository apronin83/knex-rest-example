const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const { Model } = require("objection");

// Models
const Todo = require("./model/Todo");
const Author = require("./model/Author");

//-----------------------------------------

dotenv.config();

//-----------------------------------------

const knexConnection = require("./db/config");

Model.knex(knexConnection);

//-----------------------------------------

const app = express();

app.use(bodyParser.json());

//-----------------------------------------
//-----------------------------------------

app.get("/todos/:id", async (req, res) => {
  const todo = await Todo.query().findById(req.params.id);

  if (todo) {
    res.json({ todo });
  } else {
    re.status(404).json({});
  }
});

//-----------------------------------------

app.get("/todos", async (req, res) => {
  console.log("Inner GET TODOS");

  const todos = await Todo.query().eager('author').debug(true);

  if (todos) {
    //res.json({ todos });

    res.send(todos);
  } else {
    re.status(404).json({});
  }
});

//-----------------------------------------
//-----------------------------------------

app.get("/authors/:id", async (req, res) => {
  const author = await Author.query().findById(req.params.id);

  if (author) {
    res.json({ author });
  } else {
    re.status(404).json({});
  }
});

//-----------------------------------------

app.get("/authors", async (req, res) => {
  //const authors = await Author.query().allowEager('[todos, todos.author]').eager('[todos, todos.author]').debug(true);
  const authors = await Author.query().allowEager('[todos, todos.[author]]').eager('[todos, todos.[author]]').debug(true);

  if (authors) {
    res.send(authors);
  } else {
    re.status(404).json({});
  }
});

//-----------------------------------------
//-----------------------------------------

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

//-----------------------------------------

module.exports = app;
