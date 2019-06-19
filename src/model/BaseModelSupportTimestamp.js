const { Model } = require("objection");

class BaseModelSupportTimestamp extends Model {
  static get timestamps() {
    return true;
  }
}

module.exports = BaseModelSupportTimestamp;