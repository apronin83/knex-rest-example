const express = require("express");
const asyncMiddleware = require("../utils/asyncMiddleware");
// Model
const Todo = require("../model/Todo");

const router = express.Router();

// Todos

//-----------------------------------------
// middleware that is specific to this router

router.use(
  asyncMiddleware(async (req, res, next) => {
    console.log("TODOS");
    next();
  })
);

//-----------------------------------------

router.get(
  "/",
  asyncMiddleware(async (req, res) => {
    const todos = await Todo.query()
      .eager("author")
      .debug(true);

    if (todos) {
      res.send(todos);
    } else {
      res.status(404).json({});
    }
  })
);

//-----------------------------------------

router.get(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const todo = await Todo.query()
      .findById(req.params.id)
      .debug(true);

    if (todo) {
      res.json({ todo });
    } else {
      res.status(404).json({});
    }
  })
);

module.exports = router;
