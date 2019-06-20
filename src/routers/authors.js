const express = require("express");
const asyncMiddleware = require("../utils/asyncMiddleware");
// Model
const Author = require("../model/Author");

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

router.get(
  "/",
  asyncMiddleware(async (req, res) => {
    const authors = await Author.query()
      .allowEager("[todos, todos.[author]]")
      .eager("[todos, todos.[author]]")
      .debug(true);

    if (authors) {
      res.send(authors);
    } else {
      res.status(404).json({});
    }
  })
);

//-----------------------------------------

router.get(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const author = await Author.query()
      .findById(req.params.id)
      .debug(true);

    if (author) {
      res.json({ author });
    } else {
      res.status(404).json({});
    }
  })
);

module.exports = router;
