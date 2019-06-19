const BaseModelSupportTimestamp = require("./BaseModelSupportTimestamp");

class BaseModel extends BaseModelSupportTimestamp {
	$beforeInsert() {
		if (this.timestamps) {
			const now = new Date().toISOString();

			this.createdAt = now;
			this.updatedAt = now;
		}
	}

	$beforeUpdate() {
		if (this.timestamps) {
			this.updatedAt = new Date().toISOString()
		}
	}
}

module.exports = BaseModel;