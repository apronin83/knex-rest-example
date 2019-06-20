const express = require("express");
const asyncMiddleware = require("../utils/asyncMiddleware");

const { transaction } = require("objection");

// Model
const Author = require("../models/Author");

const router = express.Router();

// Authors

//-----------------------------------------
// middleware that is specific to this router

router.use(
  asyncMiddleware(async (req, res, next) => {
    console.log("AUTHORS");
    next();
  })
);

//-----------------------------------------
// Create
/*
router.post(
  "/",
  asyncMiddleware(async (req, res) => {
    const graph = req.body;

    // It's a good idea to wrap `insertGraph` call in a transaction since it
    // may create multiple queries.
    const insertedGraph = await transaction(Author.knex(), trx => {
      return (
        Author.query(trx)
          // For security reasons, limit the relations that can be inserted.
          //.allowInsert("[pets, children.[pets, movies], movies, parent]")
          .insertGraph(graph)
      );
    });

    res.send(insertedGraph);
  })
);
*/

router.post(
  "/",
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
        .insertGraphAndFetch(graph).debug(true);
        
      console.log("BEGIN GRAPH");
      console.log(gr);
      console.log("END GRAPH");

      return gr;
    });
    //*/

    /*
    const insertedGraph = await Author.query()
      .insertAndFetch(graph)
      .debug(true);
    */

    res.send(insertedGraph);
  })
);

//-----------------------------------------
// Patch by id

router.patch(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const author = await Author.query().patchAndFetchById(
      req.params.id,
      req.body
    ).debug(true);

    res.send(author);
  })
);

//-----------------------------------------
// Delete by id

router.delete(
  "/:id",
  asyncMiddleware(async (req, res) => {
    await Author.query().deleteById(req.params.id).debug(true);

    res.send({});
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
      //res.json({ author });
      res.send(author);
    } else {
      res.status(404).json({});
    }
  })
);

module.exports = router;
