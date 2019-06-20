const express = require("express");
const asyncMiddleware = require("../utils/asyncMiddleware");

const router = express.Router();

// middleware that is specific to this router
router.use(
  asyncMiddleware(async (req, res, next) => {
    console.log("=====================================");
    console.log("Request URL:", req.originalUrl);
    next();
  }),
  asyncMiddleware(async (req, res, next) => {
    console.log("Request Type:", req.method);
    next();
  }),
  asyncMiddleware(async (req, res, next) => {
    console.log("Request Time:", new Date().toLocaleString());
    console.log("=====================================");
    next();
  })
);

module.exports = router;
