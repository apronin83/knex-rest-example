const BaseModelSupportTimestamp = require("./BaseModelSupportTimestamp");

class BaseModel extends BaseModelSupportTimestamp {
  $beforeInsert() {
    if (BaseModel.timestamps) {
      const now = new Date().toISOString();

      this.createdAt = now;
      this.updatedAt = now;
    }
  }

  $beforeUpdate() {
    if (BaseModel.timestamps) {
      this.updatedAt = new Date().toISOString();
    }
  }
}

module.exports = BaseModel;
