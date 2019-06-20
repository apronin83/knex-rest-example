const express = require("express");
const asyncMiddleware = require("../utils/asyncMiddleware");

const { transaction } = require("objection");

// Model
const User = require("../models/User");

const router = express.Router();

// Authors

//-----------------------------------------
// middleware that is specific to this router

router.use(
  asyncMiddleware(async (req, res, next) => {
    console.log("USERS");

    //console.log("BEGIN JSON");
    //console.log(req.body);
    //console.log("END JSON");

    next();
  })
);

//-----------------------------------------
// Create

router.post(
  "/",
  asyncMiddleware(async (req, res) => {
    const user = await User.query()
      .insertAndFetch(req.body)
      .debug(true);

    res.send(user);
  })
);

//-----------------------------------------
// Patch by id

router.patch(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const user = await User.query()
      .patchAndFetchById(req.params.id, req.body)
      .debug(true);

    res.send(user);
  })
);

//-----------------------------------------
// Delete by id

router.delete(
  "/:id",
  asyncMiddleware(async (req, res) => {
    await User.query()
      .deleteById(req.params.id)
      .debug(true);

    res.send({});
  })
);

//-----------------------------------------
// Fetch all

router.get(
  "/",
  asyncMiddleware(async (req, res) => {
    const users = await User.query().debug(true);

    if (users) {
      res.send(users);
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
    const user = await User.query()
      .findById(req.params.id)
      .debug(true);

    if (user) {
      res.send(user);
    } else {
      res.status(404).json({});
    }
  })
);

module.exports = router;
