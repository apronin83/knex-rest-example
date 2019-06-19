const BaseModel = require("./BaseModel");

class Todo extends BaseModel {
	static get tableName() {
		return "todos";
	}
}

module.exports = Todo;