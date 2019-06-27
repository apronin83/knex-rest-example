const { Model } = require("objection");
const { DBErrors } = require('objection-db-errors');

class BaseModelSupportTimestamp extends DBErrors(Model) {
  static get modelPaths() {
    return [__dirname];
  }

  static get timestamps() {
    return false;
  }
}

module.exports = BaseModelSupportTimestamp;
