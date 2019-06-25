const express = require("express");
const asyncMiddleware = require("../utils/asyncMiddleware");

const { transaction } = require("objection");

// Model
const Author = require("../models/Author");
const Todo = require("../models/Todo");

const router = express.Router();

const debug_mode = true;

// Authors

//-----------------------------------------

function asArray(data) {
  return Array.isArray(data) ? data : [data];
}

//-----------------------------------------
// SomeError

function SomeError(message) {
  this.name = "SomeError";
  this.message = message || "Сообщение по умолчанию";
  this.stack = new Error().stack;
}
SomeError.prototype = Object.create(Error.prototype);
SomeError.prototype.constructor = SomeError;

//-----------------------------------------
// middleware that is specific to this router

router.use(
  asyncMiddleware(async (req, res, next) => {
    console.log("AUTHORS");
    next();
  })
);

//-----------------------------------------
// Create author

router.post(
  "/",
  asyncMiddleware(async (req, res) => {
    const author = await Author.query()
      .insertAndFetch(req.body)
      .debug(debug_mode);

    res.send(author);
  })
);

//-----------------------------------------
// Create author with todos list

router.post(
  "/complex",
  asyncMiddleware(async (req, res) => {
    const graph = req.body;

    console.log("BEGIN JSON");
    console.log(graph);
    console.log("END JSON");

    //*
    // It's a good idea to wrap `insertGraph` call in a transaction since it
    // may create multiple queries.
    const insertedGraph = await transaction(Author.knex(), trx => {
      const gr = Author.query(trx)
        // For security reasons, limit the relations that can be inserted.
        .allowInsert("[todos]")
        .insertGraphAndFetch(graph)
        .debug(debug_mode);

      console.log("BEGIN GRAPH");
      console.log(gr);
      console.log("END GRAPH");

      return gr;
    });

    res.send(insertedGraph);
  })
);

//-----------------------------------------
// Patch by id

router.patch(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const author = await Author.query()
      .patchAndFetchById(req.params.id, req.body)
      .debug(debug_mode);

    res.send(author);
  })
);

//-----------------------------------------
// Delete by id with all todos of a author + Transaction

router.delete(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const author = await Author.query()
      .findById(req.params.id)
      .debug(debug_mode);

    if (author) {
      await author
        .$relatedQuery("todos")
        .delete()
        .debug(debug_mode);

      await author
        .$query()
        .delete()
        .onError(async (error, queryBuilder) => {
          // Handle `SomeError` but let other errors go through.
          if (error instanceof SomeError) {
            // This will cause the query to be resolved with an object
            // instead of throwing an error.
            return { error: "some error occurred" };
          } else {
            return Promise.reject(error);
          }
        })
        .debug(debug_mode);

      res.send({});
    } else {
      res.status(404).json({});
    }
  })
);

//-----------------------------------------
// Fetch all

router.get(
  "/",
  asyncMiddleware(async (req, res) => {
    const authors = await Author.query()
      .allowEager("[todos, todos.[author]]")
      //.eager("[todos, todos.[author]]") // Разрешаем и список todos и вложеного автора
      .eager("todos") // Разрешаем только список todos
      .debug(true);

    if (authors) {
      res.send(authors);
    } else {
      res.status(404).json({});
    }
  })
);

//-----------------------------------------
// Get by id

router.get(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const author = await Author.query()
      .findById(req.params.id)
      .debug(true);

    if (author) {
      res.send(author);
    } else {
      res.status(404).json({});
    }
  })
);

module.exports = router;
