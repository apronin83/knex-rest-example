const BaseModel = require("./BaseModel");

class Todo extends BaseModel {
  static get tableName() {
    return "todos";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["text"],

      properties: {
        id: { type: "integer" },
        text: { type: "string", minLength: 1, maxLength: 255 },

        author: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" }
          }
        }
      }
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: Autor,
        join: {
		  from: 'todos.id',
          through: {
            from: 'author_todos.todo_id',
            to: 'author_todos.author_id'
          },
          to: 'authors.id'
        }
      }
    };
  }
}
}

module.exports = Todo;
