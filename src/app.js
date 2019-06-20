const express = require("express");
const bodyParser = require("body-parser");
const asyncMiddleware = require("./utils/asyncMiddleware");
const path = require("path");
const dotenv = require("dotenv");
const { Model } = require("objection");

// Routers
const common_router = require("./routers/common");
const authors_router = require("./routers/authors");
const todos_router = require("./routers/todos");

//-----------------------------------------

dotenv.config();

//-----------------------------------------

const knexConnection = require("./db/config");

Model.knex(knexConnection);

//-----------------------------------------

const app = express();

app.use(bodyParser.json());

//-----------------------------------------

app.use(common_router);
app.use("/authors", authors_router);
app.use("/todos", todos_router);

//-----------------------------------------

app.get(
  "/*",
  asyncMiddleware(async (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  })
);

//-----------------------------------------

module.exports = app;
