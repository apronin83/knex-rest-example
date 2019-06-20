const { Model } = require("objection");

class BaseModelSupportTimestamp extends Model {
  static get modelPaths() {
    return [__dirname];
  }

  static get timestamps() {
    return false;
  }
}

module.exports = BaseModelSupportTimestamp;
