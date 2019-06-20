// https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// The error returned by this function is handled in the error handler middleware in app.js.
const createStatusCodeError = statusCode => {
  return Object.assign(new Error(), {
    statusCode
  });
};

module.exports = asyncMiddleware;
